import { ReactNode } from 'react';

const EditButtonAbsolute = ({ children }: { children: ReactNode }) => {
    return (
        <div style={{ height: '25px', width: 'auto', position: 'absolute', top: '0', right: '0', }} >
            {children}
        </div>
    );
}

export default EditButtonAbsolute;