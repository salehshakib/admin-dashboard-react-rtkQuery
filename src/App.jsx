import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";

function App() {
  const theme = {
    components: {
      Menu: {
        itemSelectedBg: "#F0F5FA",
        itemSelectedColor: "#A7AFBC",
      },
      Table: {
        headerBg: "#FAFBFC",
        headerBorderRadius: "12px",
        headerColor: "#4E5D78",
        headerSplitColor: "none",
      },
    },
  };
  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <ConfigProvider theme={theme}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </div>
    </>
  );
}

export default App;
