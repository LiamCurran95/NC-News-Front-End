import FlareIcon from "@mui/icons-material/Flare";
import { Icon } from "@mui/material";

const Footer = () => {
	return (
		<footer className="Footer">
			<div>
				<Icon className="icon-flare">
					<FlareIcon fontSize="large" />
				</Icon>
				Powered by Liam
				<Icon className="icon-flare">
					<FlareIcon fontSize="large" />
				</Icon>
			</div>
		</footer>
	);
};

export default Footer;
