import { Box } from "@mui/material";
import SizingProps from "../../interfaces/SizingProps";

interface HeaderProps {
    sizing?: SizingProps;
}
export default function Header({sizing}: HeaderProps) {
    return (
        <Box component="div" className="header" sx={{ backgroundColor: "black", ...sizing }}>

        </Box>
    )
}
