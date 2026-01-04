import "./App.css";

//react libraries
import { useEffect, useState } from "react";
//matrial ui library
import { Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import SunnyIcon from "@mui/icons-material/Sunny";
import TranslateIcon from "@mui/icons-material/Translate";

//libraries
import axios from "axios";
import moment from "moment";
import { useTranslation } from "react-i18next";
import "moment/dist/locale/ar";
moment.locale("ar");
const theme = createTheme({
  typography: {
    fontFamily: ' "inter-var","sans-serif"',
  },
});

let cancelTokenOperator = null;

let time = moment().hour();

console.log(typeof time);
function App() {
  const [date, setDate] = useState(null);

  const [temp, setTemp] = useState({
    temp: null,
    min: null,
    max: null,
    description: null,
    icon: null,
  });

  const { t, i18n } = useTranslation();
  const [local, setLocal] = useState("en");

  useEffect(() => {
    setDate(moment().format("MMM Do YY"));

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=31.03637&lon=31.38069&appid=082815cd7822c9d0bc944a422e9667c1`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelTokenOperator = c;
          }),
        }
      )
      .then((response) => {
        const temp = Math.round(response.data.main.temp - 273.15);
        const min = Math.round(response.data.main.temp_min - 273.15);
        const max = Math.round(response.data.main.temp_max - 273.15);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        console.log(icon);
        setTemp({
          temp,
          min,
          max,
          description,
          icon,
        });
      })
      .catch((err) => {
        console.log(`The Error while get Tepm is>>>>>>>>>>>>>${err}`);
      });
    return () => {
      cancelTokenOperator();
    };
  }, []);

  function translateText() {
    if (local == "ar") {
      setLocal("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    } else {
      setLocal("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
    setDate(moment().format("MMM Do YY"));
  }

  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);
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
                <TranslateIcon
                  className="translateIcon"
                  style={{ padding: "2px" }}
                  onClick={translateText}
                />

                <div
                  className="header"
                  dir={local =='en'?'ltr':'rtl'}
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
                    {t("Mansourah")}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      color: "white",
                      marginRight: "20px",
                    }}
                  >
                    {date}
                  </Typography>
                </div>
                <hr />
                <div
                  className="body"
                  dir={local =='en'?'ltr':'rtl'}
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className="degree"
                    >
                      <Typography variant="h4">{temp.temp}</Typography>
                      <img
                        src={`https://openweathermap.org/img/wn/10d@2x.png`}
                        alt="weather status img"
                      />
                    </div>
                    <div className="discription">
                      <Typography style={{ padding: "10px" }}>
                        {t(temp.description)}
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
                          {t("Low")}: {temp.min}
                        </Typography>
                        <span style={{ margin: "15px" }}>|</span>
                        <Typography
                          variant={"span"}
                          style={{ fontSize: "15px" }}
                        >
                          {t("High")} : {temp.max}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="left-body" style={{ padding: "10px" }}>
                    {time >= 6 && time < 18 ? (
                      <SunnyIcon style={{ fontSize: "230px" }} />
                    ) : (
                      <NightsStayIcon style={{ fontSize: "230px" }} />
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
