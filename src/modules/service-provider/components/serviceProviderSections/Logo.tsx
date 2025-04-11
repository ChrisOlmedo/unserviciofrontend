import { Image } from "../../../../types/types";
import EditButtonAbsolute from "./EditButtonAbsolute";
import EditButton from "../EditButton";

interface LogoProps {
    logo: Image;
}

const Logo = ({ logo }: LogoProps) => {
    return (
        <div>
            <img src={logo.url} alt="serviceProvider" className="serviceProvider-image" />
            <EditButtonAbsolute>
                <EditButton context="logo" />
            </EditButtonAbsolute>
        </div>
    );
};

export default Logo;