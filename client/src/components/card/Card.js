import { Box, useStyleConfig } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function Card(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });
  const history = useHistory();

  return (
    <Box
      __css={styles}
      {...rest}
      id={props.id}
      style={props.id && { cursor: "pointer" }}
      onClick={(e) => {
        e.target.id === "111"
          ? history.push("/admin/users/unassigned")
          : e.target.id === "222"
          ? history.push("/manager/users/unassigned")
          : console.log("Helwan University");
      }}
    >
      {children}
    </Box>
  );
}

export default Card;
