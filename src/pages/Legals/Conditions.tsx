import AppVar from "../../mainvariables.json"

const Conditionals = () => {
    return (
        <div className="container my-5">
            <h1 className="text-center">Términos y Condiciones de Servicio</h1>

            <div className="mt-4">
                <h2>1. Introducción</h2>
                <p>Bienvenido a {AppVar.nameApp} ("nosotros", "nuestro" o "la Aplicación"). Al utilizar nuestros servicios, aceptas estar sujeto a estos Términos y Condiciones ("Términos"). Por favor, léelos cuidadosamente. Si no estás de acuerdo con ellos, no deberás usar nuestra aplicación.</p>
            </div>

            <div className="mt-4">
                <h2>2. Descripción del Servicio</h2>
                <p>{AppVar.nameApp} proporciona una plataforma para conectar servicios domésticos y empresariales con usuarios finales en México. Los servicios incluyen la personalización de perfiles, la gestión de calificaciones e historial, y notificaciones. Podrán añadirse nuevas funcionalidades en el futuro.</p>
            </div>

            <div className="mt-4">
                <h2>3. Elegibilidad</h2>
                <p>Para utilizar nuestra aplicación, debes ser mayor de edad según las leyes de tu jurisdicción. Al registrarte, garantizas que toda la información proporcionada es verídica y actualizada.</p>
            </div>

            <div className="mt-4">
                <h2>4. Uso de la Cuenta</h2>
                <ul>
                    <li>Eres responsable de mantener la confidencialidad de tu cuenta y contraseña.</li>
                    <li>Notifícanos inmediatamente si detectas uso no autorizado de tu cuenta.</li>
                    <li>Nos reservamos el derecho de suspender o eliminar cuentas en caso de violación de los Términos.</li>
                </ul>
            </div>

            <div className="mt-4">
                <h2>5. Datos del Usuario</h2>
                <p>Recopilamos y utilizamos tu información personal según nuestra <a href="/privacy-policy">Política de Privacidad</a>. Esto incluye nombre, correo electrónico y otros datos necesarios para brindarte el servicio.</p>
            </div>

            <div className="mt-4">
                <h2>6. Conducta del Usuario</h2>
                <ul>
                    <li>No puedes utilizar nuestra aplicación para fines ilegales o no autorizados.</li>
                    <li>Está prohibido manipular, descompilar o realizar ingeniería inversa sobre la aplicación.</li>
                    <li>Los usuarios deben respetar a otros miembros de la comunidad.</li>
                </ul>
            </div>

            <div className="mt-4">
                <h2>7. Pagos y Tarifas</h2>
                <p>Cualquier costo asociado al uso de servicios en la aplicación será claramente especificado. Nos reservamos el derecho de cambiar las tarifas notificándolo previamente.</p>
            </div>

            <div className="mt-4">
                <h2>8. Modificaciones al Servicio</h2>
                <p>Podemos modificar o interrumpir temporal o permanentemente el servicio en cualquier momento, con o sin notificación previa.</p>
            </div>

            <div className="mt-4">
                <h2>9. Limitación de Responsabilidad</h2>
                <ul>
                    <li>No garantizamos que el servicio estará libre de errores o interrupciones.</li>
                    <li>No somos responsables de daños indirectos, incidentales o consecuenciales derivados del uso de nuestra aplicación.</li>
                </ul>
            </div>

            <div className="mt-4">
                <h2>10. Ley Aplicable</h2>
                <p>Estos Términos se rigen por las leyes de México. Cualquier disputa será resuelta en los tribunales competentes de México.</p>
            </div>

            <div className="mt-4">
                <h2>11. Cambios a los Términos</h2>
                <p>Nos reservamos el derecho de actualizar estos Términos en cualquier momento. Te notificaremos sobre cambios significativos y tu uso continuado del servicio implicará aceptación de los mismos.</p>
            </div>

            <div className="mt-4">
                <h2>12. Contacto</h2>
                <p>Para cualquier duda o inquietud, puedes contactarnos en {AppVar.email}.</p>
            </div>
        </div>
    );
};

export default Conditionals;