import AppVar from "../../mainvariables.json"

const PrivacyPoliticals = () => {
    return (
        <div className="container my-5">
            <h1 className="mb-4">Política de Privacidad</h1>

            <p><strong>Fecha de entrada en vigor:</strong> 10-01-2025</p>

            <p>Esta Política de Privacidad describe cómo {AppVar.nameApp} ("nosotros", "nuestro", "la aplicación") recopila, utiliza y protege la información personal de los usuarios ("usted", "su"). Al utilizar nuestra aplicación, usted acepta los términos descritos en esta política.</p>

            <h2 className="mt-4">1. Información que recopilamos</h2>

            <p>Podemos recopilar los siguientes datos personales cuando usted interactúa con nuestra aplicación:</p>

            <ul>
                <li><strong>Nombre:</strong> Para personalizar su perfil.</li>
                <li><strong>Correo electrónico:</strong> Para enviarte notificaciones relacionadas con su cuenta, como actualizaciones importantes o recordatorios.</li>
            </ul>

            <h2 className="mt-4">2. Uso de la información</h2>

            <p>La información recopilada se utiliza para:</p>

            <ul>
                <li>Proporcionar acceso seguro a su cuenta.</li>
                <li>Personalizar su experiencia en la aplicación.</li>
                <li>Enviar notificaciones o mensajes importantes relacionados con los servicios ofrecidos.</li>
                <li>Mejorar la funcionalidad de nuestra aplicación.</li>
            </ul>

            <p>En el futuro, también podría usarse para:</p>

            <ul>
                <li>Mostrar historial de calificaciones y actividad.</li>
                <li>Ofrecer servicios personalizados o promociones relevantes.</li>
            </ul>

            <h2 className="mt-4">3. Servicios de terceros</h2>

            <p>Podemos integrar servicios externos que podrían recopilar información adicional. Estos servicios incluyen, pero no están limitados a:</p>

            <ul>
                <li><strong>Google OAuth:</strong> Para autenticación segura.</li>
                <li><strong>Google Analytics (opcional):</strong> Para recopilar datos de uso y mejorar la experiencia del usuario.</li>
            </ul>

            <p>Nos aseguraremos de que cualquier proveedor externo cumpla con las leyes de privacidad aplicables.</p>

            <h2 className="mt-4">4. Protección de datos</h2>

            <p>Nos comprometemos a proteger la información de nuestros usuarios implementando las siguientes medidas:</p>

            <ul>
                <li>Uso de contraseñas seguras y cifrado para almacenar datos sensibles.</li>
                <li>Monitoreo constante de nuestros sistemas para prevenir accesos no autorizados.</li>
            </ul>

            <h2 className="mt-4">5. Alcance geográfico</h2>

            <p>Nuestra aplicación está diseñada para usuarios en México y cumple con las leyes locales de privacidad.</p>

            <h2 className="mt-4">6. Sus derechos</h2>

            <p>Como usuario, tiene derecho a:</p>

            <ul>
                <li>Acceder a los datos que tenemos sobre usted.</li>
                <li>Solicitar la corrección o eliminación de su información personal.</li>
                <li>Retirar su consentimiento para el procesamiento de sus datos en cualquier momento.</li>
            </ul>

            <p>Para ejercer estos derechos, puede contactarnos en: {AppVar.nameApp}.com</p>

            <h2 className="mt-4">7. Cambios a esta política</h2>

            <p>Nos reservamos el derecho de actualizar esta política de privacidad para reflejar cambios en nuestras prácticas o servicios. Le notificaremos sobre cualquier cambio importante mediante correo electrónico o una notificación en la aplicación.</p>

            <h2 className="mt-4">8. Contacto</h2>

            <p>Si tiene preguntas o inquietudes sobre esta Política de Privacidad, contáctenos en:</p>

            <p><strong>Correo electrónico:</strong> {AppVar.email}</p>

            <p><strong>Teléfono:</strong> {AppVar.phone}</p>
        </div>
    );
};

export default PrivacyPoliticals;