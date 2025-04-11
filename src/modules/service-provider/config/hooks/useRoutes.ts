import { routePaths, RouteSection } from '../../../../router/routePaths';

export const useRoutes = () => {

    return {
        getSectionEdit: (section: RouteSection) =>
            routePaths.getSectionEdit(section),
    };
};