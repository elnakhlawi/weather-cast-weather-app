import "./App.css";
import { Typography } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  typography:{
  fontFamily:' "inter-var","sans-serif"' ,
  
  }
});


function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Typography variant="h1" gutterBottom className="main-title">
        Weather Site
      </Typography>
      <div className="container"></div>
      </ThemeProvider>
    </>
  );
}

export default App;
