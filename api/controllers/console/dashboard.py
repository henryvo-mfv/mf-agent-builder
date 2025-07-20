from flask import jsonify, request
from flask_login import current_user
from flask_restful import Resource

from controllers.console import api
from controllers.console.wraps import account_initialization_required, setup_required
from libs.login import login_required
from services.dashboard_service import DashboardService


class DashboardStatsApi(Resource):
    """
    Dashboard statistics API endpoint.
    Returns aggregated statistics for the current tenant's dashboard.
    """

    @setup_required
    @login_required
    @account_initialization_required
    def get(self):
        """
        Get dashboard statistics for the current tenant.

        Returns:
            JSON response containing:
            - activeAgents: count of published apps
            - drafts: count of unpublished apps
            - recentActivityTasks: count of messages/workflow runs in last 24h
            - dataSources: count of connected datasets
        """
        tenant_id = current_user.current_tenant_id

        try:
            stats = DashboardService.get_dashboard_stats(tenant_id)
            return jsonify(stats)
        except Exception as e:
            # Log the error but return empty stats to not break UI
            import logging

            logging.exception(f"Dashboard stats error for tenant {tenant_id}: {str(e)}")  # noqa: TRY401

            # Return default empty stats structure
            return jsonify(
                {
                    "activeAgents": 0,
                    "drafts": 0,
                    "recentActivityTasks": 0,
                    "dataSources": 0,
                }
            )


class DashboardRecentAgentsApi(Resource):
    """
    Dashboard recent agents API endpoint.
    Returns recent agents (apps) for the current tenant's dashboard.
    """

    @setup_required
    @login_required
    @account_initialization_required
    def get(self):
        """
        Get recent agents for the current tenant.

        Returns:
            JSON response containing array of recent agents with:
            - id: agent ID
            - name: agent name
            - mode: agent mode (chat, completion, workflow, etc.)
            - status: 'active' or 'draft' based on publication status
            - lastEdited: ISO formatted last updated timestamp
            - iconType: type of icon (emoji, image, etc.)
            - icon: icon value (emoji or image path)
            - iconBackground: background color for icon
            - iconUrl: full URL if icon is an image URL
        """
        tenant_id = current_user.current_tenant_id

        try:
            # Get limit from query params, default to 5
            limit = int(request.args.get("limit", 5))
            # Cap limit to prevent abuse
            limit = min(limit, 20)

            agents = DashboardService.get_recent_agents(tenant_id, limit)
            return jsonify(agents)
        except Exception as e:
            # Log the error but return empty array to not break UI
            import logging

            logging.exception(f"Recent agents error for tenant {tenant_id}: {e}")  # noqa: TRY401

            # Return empty array if error occurs
            return jsonify([])


# Register the API endpoints
api.add_resource(DashboardStatsApi, "/dashboard/stats")
api.add_resource(DashboardRecentAgentsApi, "/dashboard/recent-agents")
