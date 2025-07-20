from datetime import datetime, timedelta
from typing import Any

from extensions.ext_database import db
from models.enums import WorkflowRunTriggeredFrom


class DashboardService:
    """
    Service for aggregating dashboard statistics across a tenant.
    Follows patterns from existing statistic controllers but aggregates at tenant level.
    """

    @classmethod
    def get_dashboard_stats(cls, tenant_id: str) -> dict[str, Any]:
        """
        Get all dashboard statistics for a tenant.

        :param tenant_id: tenant ID to get stats for
        :return: dict containing all dashboard statistics
        """
        # Calculate 24 hours ago for recent activity
        now = datetime.utcnow()
        last_24h = now - timedelta(hours=24)

        return {
            "activeAgents": cls._get_active_agents_count(tenant_id),
            "drafts": cls._get_draft_agents_count(tenant_id),
            "recentActivityTasks": cls._get_recent_activity_count(tenant_id, last_24h),
            "dataSources": cls._get_data_sources_count(tenant_id),
        }

    @classmethod
    def _get_active_agents_count(cls, tenant_id: str) -> int:
        """
        Count apps that are published (have site or API enabled).

        :param tenant_id: tenant ID
        :return: count of active agents
        """
        sql_query = """
        SELECT COUNT(*) as count
        FROM apps
        WHERE tenant_id = :tenant_id
        AND (enable_site = true OR enable_api = true)
        """

        with db.engine.begin() as conn:
            result = conn.execute(db.text(sql_query), {"tenant_id": tenant_id}).first()
            return result.count if result else 0

    @classmethod
    def _get_draft_agents_count(cls, tenant_id: str) -> int:
        """
        Count apps that are not published (both site and API disabled).

        :param tenant_id: tenant ID
        :return: count of draft agents
        """
        sql_query = """
        SELECT COUNT(*) as count
        FROM apps
        WHERE tenant_id = :tenant_id
        AND enable_site = false
        AND enable_api = false
        """

        with db.engine.begin() as conn:
            result = conn.execute(db.text(sql_query), {"tenant_id": tenant_id}).first()
            return result.count if result else 0

    @classmethod
    def _get_recent_activity_count(
        cls, tenant_id: str, since_datetime: datetime
    ) -> int:
        """
        Count recent messages and workflow runs in the last 24 hours.

        :param tenant_id: tenant ID
        :param since_datetime: datetime to count activity since
        :return: total count of recent activity tasks
        """
        # Count messages in the last 24 hours
        message_sql = """
        SELECT COUNT(*) as count
        FROM messages m
        JOIN apps a ON m.app_id = a.id
        WHERE a.tenant_id = :tenant_id
        AND m.created_at >= :since_datetime
        """

        # Count workflow runs in the last 24 hours (non-debug runs only)
        workflow_sql = """
        SELECT COUNT(*) as count
        FROM workflow_runs wr
        JOIN apps a ON wr.app_id = a.id
        WHERE a.tenant_id = :tenant_id
        AND wr.created_at >= :since_datetime
        AND wr.triggered_from = :triggered_from
        """

        args = {
            "tenant_id": tenant_id,
            "since_datetime": since_datetime,
            "triggered_from": WorkflowRunTriggeredFrom.APP_RUN.value,
        }

        with db.engine.begin() as conn:
            message_result = conn.execute(db.text(message_sql), args).first()
            workflow_result = conn.execute(db.text(workflow_sql), args).first()

            message_count = message_result.count if message_result else 0
            workflow_count = workflow_result.count if workflow_result else 0

            return message_count + workflow_count

    @classmethod
    def _get_data_sources_count(cls, tenant_id: str) -> int:
        """
        Count unique datasets connected to apps in this tenant.

        :param tenant_id: tenant ID
        :return: count of connected data sources (datasets)
        """
        sql_query = """
        SELECT COUNT(DISTINCT adj.dataset_id) as count
        FROM app_dataset_joins adj
        JOIN apps a ON adj.app_id = a.id
        WHERE a.tenant_id = :tenant_id
        """

        with db.engine.begin() as conn:
            result = conn.execute(db.text(sql_query), {"tenant_id": tenant_id}).first()
            return result.count if result else 0

    @classmethod
    def get_recent_agents(cls, tenant_id: str, limit: int = 5) -> list[dict[str, Any]]:
        """
        Get recently updated agents (apps) for the dashboard.

        :param tenant_id: tenant ID
        :param limit: maximum number of agents to return
        :return: list of recent agent data
        """
        sql_query = """
        SELECT
            id,
            name,
            mode,
            enable_site,
            enable_api,
            updated_at,
            icon_type,
            icon,
            icon_background
        FROM apps
        WHERE tenant_id = :tenant_id
        AND status = 'normal'
        ORDER BY updated_at DESC
        LIMIT :limit
        """

        with db.engine.begin() as conn:
            results = conn.execute(
                db.text(sql_query), {"tenant_id": tenant_id, "limit": limit}
            ).fetchall()

            agents = []
            for row in results:
                # Determine status based on enable_site and enable_api
                status = "active" if (row.enable_site or row.enable_api) else "draft"

                # Format the icon URL if it's a URL-type icon
                icon_url = None
                if row.icon_type == "image" and row.icon:
                    # If it's already a full URL, use it; otherwise it might be a file path
                    icon_url = (
                        row.icon
                        if row.icon.startswith(("http://", "https://"))
                        else None
                    )

                agent = {
                    "id": str(row.id),
                    "name": row.name,
                    "mode": row.mode,
                    "status": status,
                    "lastEdited": (
                        row.updated_at.isoformat() if row.updated_at else None
                    ),
                    "iconType": row.icon_type,
                    "icon": row.icon,
                    "iconBackground": row.icon_background,
                    "iconUrl": icon_url,
                }
                agents.append(agent)

            return agents
