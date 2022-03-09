import FlareIcon from "@mui/icons-material/Flare";
import { Icon, Divider } from "@mui/material";

const Footer = () => {
	return (
		<footer className="Footer">
			<div>
				<Icon className="icon-flare">
					<FlareIcon fontsize="large" />
				</Icon>
				Powered by Liam
				<Icon className="icon-flare">
					<FlareIcon fontsize="large" />
				</Icon>
			</div>
		</footer>
	);
};

export default Footer;
