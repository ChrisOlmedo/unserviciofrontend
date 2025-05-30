import { routePaths } from '../../../../../router/routePaths';
import { RouteSection } from "types";

export const useRoutes = () => {

    return {
        getSectionEdit: (section: RouteSection) =>
            routePaths.getSectionEdit(section),
    };
};