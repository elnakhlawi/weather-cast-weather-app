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
    name: null,
    description: null,
    icon: null,
  });

  const { t, i18n } = useTranslation();
  const [local, setLocal] = useState("en");
  useEffect(() => {
    setDate(moment().format("MMM Do YY"));

    // 1. طلب إحداثيات المستخدم من المتصفح
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // 2. إرسال طلب الـ API باستخدام الإحداثيات بدلاً من الاسم
        const apiKey = "082815cd7822c9d0bc944a422e9667c1";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=${local}`;

        axios
          .get(url)
          .then((response) => {
            // هنا ستحصل على بيانات مدينة المستخدم الحالية تلقائياً
            setTemp({
              temp: Math.round(response.data.main.temp),
              min: Math.round(response.data.main.temp_min),
              max: Math.round(response.data.main.temp_max),
              name: response.data.name, // سيظهر اسم المدينة تلقائياً (مثلاً: المنصورة)
              description: response.data.weather[0].description,
              icon: response.data.weather[0].icon,
            });
          })
          .catch((error) => console.log("Error fetching weather:", error));
      },
      (error) => {
        // في حال رفض المستخدم إعطاء الإذن، يمكنك وضع مدينة افتراضية
        console.log("User denied location access", error);
      }
    );
  }, [local]); // يتحدث عند تغيير اللغة أيضاً
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
                  dir={local == "en" ? "ltr" : "rtl"}
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
                    {t(temp.name)}
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
                  dir={local == "en" ? "ltr" : "rtl"}
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
