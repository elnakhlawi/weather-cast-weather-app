import "./App.css";

//react libraries
import { useEffect,useState} from "react";
//matrial ui library
import { Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import SunnyIcon from "@mui/icons-material/Sunny";

//libraries
import axios from "axios";

const theme = createTheme({
  typography: {
    fontFamily: ' "inter-var","sans-serif"',
  },
});

let cancelTokenOperator=null;
function App() {
  const [temp,setTemp]=useState(null)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=31.03637&lon=31.38069&appid=082815cd7822c9d0bc944a422e9667c1`,{
      cancelToken:new axios.CancelToken((c) => { cancelTokenOperator=c; })
    }).then((response) => { 
    setTemp(Math.round(response.data.main.temp - 273.15));
     }).catch((err) => { console.log(`The Error while get Tepm is>>>>>>>>>>>>>${err}`); })
     return () => { cancelTokenOperator() }
    },[])
  let weatherDegree = "30";
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" style={{}}>
          <Typography variant="h1" className="main-title">
            Weather Site
          </Typography>
          <div className="flex-container" style={{ height: "100vh" }}>
            <div
              className="content"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#0A3F9E",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <div
                  className="header"
                  dir="rtl"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-end", // يفضل استخدام flex-end لضمان التوافق
                    justifyContent: "start",
                    padding: "20px",
                  }}
                >
                  <Typography
                    variant="h3"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    القاهرة
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      color: "white",
                      marginRight: "20px",
                    }}
                  >
                    27/12/2025{" "}
                  </Typography>
                </div>
                <hr />
                <div
                  className="body"
                  dir="rtl"
                  style={{
                    display: "flex",
                    color: "white",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="right-body"
                    style={{ padding: "10px", color: "white" }}
                  >
                    <div className="degree">
                      <Typography variant="h4">{temp}</Typography>
                      {/* Todo:img here */}
                    </div>
                    <div className="discription">
                      <Typography style={{ padding: "10px" }}>
                        broken clouds
                      </Typography>
                      <div
                        className="min-max"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "white",
                        }}
                      >
                        <Typography variant="span" style={{ fontSize: "15px" }}>
                          الصغري :38
                        </Typography>
                        <span style={{ margin: "15px" }}>|</span>
                        <Typography
                          variant={"span"}
                          style={{ fontSize: "15px" }}
                        >
                          الكبري :38
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="left-body" style={{ padding: "10px" }}>
                    {weatherDegree >= 30 ? (
                      <SunnyIcon style={{ fontSize: "230px" }} />
                    ) : (
                      <CloudIcon style={{ fontSize: "230px" }} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
