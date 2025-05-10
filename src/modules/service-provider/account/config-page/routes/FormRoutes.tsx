import { FORM_COMPONENTS } from '../const/formConst';
import FormModal from '../forms/FormModal'; // Asume que tienes este componente
import { Route } from 'react-router-dom';


const ServiceProviderFormRoutes = () => {

    return Object.entries(FORM_COMPONENTS).map(([section, formConfig]) => (
        <Route
            key={section}
            path={section}
            element={
                <FormModal formConfig={formConfig} />
            }
        />
    ));
};

export default ServiceProviderFormRoutes;
