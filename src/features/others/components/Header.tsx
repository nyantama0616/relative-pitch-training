import { SxProps } from "@mui/material";
import { Box } from "@mui/material";
interface HeaderProps {
    sx?: SxProps;
}
export default function Header({sx}: HeaderProps) {
    return (
        <Box component="div" className="header" sx={{ backgroundColor: "black", ...sx }}>

        </Box>
    )
}
