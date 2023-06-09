import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));
export const ListWrapper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  background: theme.palette.background.default,
  color: theme.palette.text.secondary,
  minHeight: 600,
  maxHeight : 600,
  position : 'relative',
}));

export const MessageWrapper = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.background.alt,
  borderRadius:15,
  display: 'block',
  width :'fit-content',

}))
export default WidgetWrapper;