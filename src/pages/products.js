import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/footer";
import LatestBliendCollaction from "../components/latestBliendCollaction";
import { Helmet } from "react-helmet";
import Navbar from "../components/navbar";
import { Link, useLocation } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import HowToMassure from "../components/howToMassure";
import { baseUrlForMedia, publicRequest, userRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import Skeliton from "../components/loadingSkeleton/Skeliton";
import ReactImageMagnify from "react-image-magnify";

import Modal from "../components/info-model";
import Info from "../components/info-json";
import Loader from "../components/loader";
import { toast } from "react-toastify";

function Products() {
  (function () {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    Date.prototype.getDayName = function () {
      return days[this.getDay()];
    };
  })();
  const current = new Date();
  const standardDate = current.getDate();
  const nextMpnth = new Date(
    current.getFullYear(),
    current.getMonth() + 1,
    standardDate
  );
  const standerdmonth = nextMpnth.toLocaleString("default", { month: "short" });
  const standerddayname = nextMpnth.getDayName();
  const delivarydate =
    standardDate + " " + standerdmonth + "," + standerddayname;

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState([]);
  const [BliendPrice, setBliendPrice] = useState(0);
  const [InitialPrice, setInitialPrice] = useState(0);
  const [IsLoaded, setIsLoaded] = useState(true);

  const [ThisBlindTypeMOtore, setThisBlindTypeMOtore] = useState([]);
  const [ThisBlindTyperemotes, setThisBlindTyperemotes] = useState([]);
  const [ThisBlindTypeAccessories, setThisBlindTypeAccessories] = useState([]);

  const [minWidthWithType, SetminWidthWithType] = useState(400);
  const [maxWidthWithType, SetmaxWidthWithType] = useState(3200);
  const [minDropWithType, SetminDropWithType] = useState(400);
  const [maxDropWithType, SetmaxDropWithType] = useState(4000);

  const [MaxoparatingmanualPlainWidth, SetMaxoparatingmanualPlainWidth] =
    useState(null);
  const [MaxoparatingmanualPlainDrop, SetMaxoparatingmanualPlainDrop] =
    useState(null);
  const [
    MaxoparatingmanualDecoraruveWidth,
    SetMaxoparatingmanualDecoraruveWidth,
  ] = useState(null);
  const [
    MaxoparatingmanualDecoraruveDrop,
    SetMaxoparatingmanualDecoraruveDrop,
  ] = useState(null);
  const [MaxoparatingmoterPlainWidth, SetMaxoparatingmoterPlainWidth] =
    useState(null);
  const [MaxoparatingmoterPlainDrop, SetMaxoparatingmoterPlainDrop] =
    useState(null);
  const [
    MaxoparatingmoterDecoraruveWidth,
    SetMaxoparatingmoterDecoraruveWidth,
  ] = useState(null);
  const [MaxoparatingmoterDecoraruveDrop, SetMaxoparatingmoterDecoraruveDrop] =
    useState(null);

  const [images, setImages] = useState([]);
  const [img, setImg] = useState(images[0]);
  const [AllFabric, setAllFabric] = useState([]);
  useEffect(() => {
    const getProdcut = async () => {
      try {
        const res = await publicRequest.get("/product/find/" + id);
        setProduct(res.data);
        setBliendPrice(res.data.price);
        setInitialPrice(res.data.price);
        setTimeout(() => {
          setIsLoaded(false);
        }, 2000);
        publicRequest
          .get(`/Fabrics/type/${res.data.type[0]}`)
          .then((response) => {
            setAllFabric(response.data);
          })
          .catch((error) => console.error(error));
        const getmotores = await publicRequest.get(
          "/OperatingSystem/Motore/find/" + res.data.type[0]
        );
        setThisBlindTypeMOtore(getmotores.data);
        const getRemotes = await publicRequest.get(
          "/OperatingSystem/Remote/find/" + res.data.type[0]
        );
        setThisBlindTyperemotes(getRemotes.data);
        const getAccessories = await publicRequest.get(
          "/OperatingSystem/Accessories/find/" + res.data.type[0]
        );
        setThisBlindTypeAccessories(getAccessories.data);
        /* const imageData = res.data.img.data.map((e, i) => {
          return {
            data: e,
            contentType: res.data.img.contentType[i],
          };
        }); */
        const productimgget1 = `../assets/img/fabrics/febrickBlind/${res.data.img[0]}`;
        const productimgget2 = `../assets/img/fabrics/febrickBlind/${res.data.img[1]}`;
        let imgobj = [productimgget1, productimgget2];
        setImages(res.data.img);
        setImg(res.data.img[0]);
        if (res.data.type[0] === "Roller") {
          SetminWidthWithType(300);
          SetmaxWidthWithType(3000);
          SetminDropWithType(300);
          SetmaxDropWithType(6000);

          SetMaxoparatingmanualPlainWidth(2500);
          SetMaxoparatingmanualPlainDrop(4000);
          SetMaxoparatingmanualDecoraruveWidth(2500);
          SetMaxoparatingmanualDecoraruveDrop(3200);
          SetMaxoparatingmoterPlainWidth(3000);
          SetMaxoparatingmoterPlainDrop(6000);
          SetMaxoparatingmoterDecoraruveWidth(3000);
          SetMaxoparatingmoterDecoraruveDrop(4000);
        } else if (res.data.type[0] === "Vertical") {
          SetminWidthWithType(500);
          SetmaxWidthWithType(4000);
          SetminDropWithType(500);
          SetmaxDropWithType(4000);
        } else if (res.data.type[0] === "Wooden") {
          SetminWidthWithType(500);
          SetmaxWidthWithType(2900);
          SetminDropWithType(1000);
          SetmaxDropWithType(3500);
        } else if (res.data.type[0] === "Sierra") {
          SetminWidthWithType(700);
          SetmaxWidthWithType(4000);
          SetminDropWithType(1000);
          SetmaxDropWithType(2800);
        } else if (res.data.type[0] === "Patricia") {
          SetminWidthWithType(750);
          SetmaxWidthWithType(3500);
          SetminDropWithType(1000);
          SetmaxDropWithType(4000);
        } else if (res.data.type[0] === "Meliso") {
          SetminWidthWithType(300);
          SetmaxWidthWithType(2600);
          SetminDropWithType(500);
          SetmaxDropWithType(4000);

          SetMaxoparatingmanualPlainWidth(2400);
          SetMaxoparatingmanualPlainDrop(2800);
          SetMaxoparatingmanualDecoraruveWidth(2400);
          SetMaxoparatingmanualDecoraruveDrop(2800);
          SetMaxoparatingmoterPlainWidth(2600);
          SetMaxoparatingmoterPlainDrop(4000);
          SetMaxoparatingmoterDecoraruveWidth(2600);
          SetMaxoparatingmoterDecoraruveDrop(2800);
        } else if (res.data.type[0] === "Luzon") {
          SetminWidthWithType(350);
          SetmaxWidthWithType(2750);
          SetminDropWithType(500);
          SetmaxDropWithType(5000);

          SetMaxoparatingmanualPlainWidth(2700);
          SetMaxoparatingmanualPlainDrop(3500);
          SetMaxoparatingmanualDecoraruveWidth(2700);
          SetMaxoparatingmanualDecoraruveDrop(2500);
          SetMaxoparatingmoterPlainWidth(2750);
          SetMaxoparatingmoterPlainDrop(5000);
          SetMaxoparatingmoterDecoraruveWidth(2750);
          SetMaxoparatingmoterDecoraruveDrop(3000);
        } else if (res.data.type[0] === "Grayson") {
          SetminWidthWithType(300);
          SetmaxWidthWithType(2800);
          SetminDropWithType(500);
          SetmaxDropWithType(4000);

          SetMaxoparatingmanualPlainWidth(2500);
          SetMaxoparatingmanualPlainDrop(3500);
          SetMaxoparatingmanualDecoraruveWidth(2500);
          SetMaxoparatingmanualDecoraruveDrop(3500);
          SetMaxoparatingmoterPlainWidth(2800);
          SetMaxoparatingmoterPlainDrop(4000);
          SetMaxoparatingmoterDecoraruveWidth(2800);
          SetMaxoparatingmoterDecoraruveDrop(3500);
        } else if (res.data.type[0] === "Dorren") {
          SetminWidthWithType(300);
          SetmaxWidthWithType(2800);
          SetminDropWithType(500);
          SetmaxDropWithType(4000);

          SetMaxoparatingmanualPlainWidth(2600);
          SetMaxoparatingmanualPlainDrop(3500);
          SetMaxoparatingmanualDecoraruveWidth(2600);
          SetMaxoparatingmanualDecoraruveDrop(2800);
          SetMaxoparatingmoterPlainWidth(2800);
          SetMaxoparatingmoterPlainDrop(4000);
          SetMaxoparatingmoterDecoraruveWidth(2800);
          SetMaxoparatingmoterDecoraruveDrop(3000);
        } else if (res.data.type[0] === "Colby") {
          SetminWidthWithType(300);
          SetmaxWidthWithType(3000);
          SetminDropWithType(500);
          SetmaxDropWithType(5000);
        } else if (res.data.type[0] === "Aric") {
          SetminWidthWithType(700);
          SetmaxWidthWithType(2800);
          SetminDropWithType(1000);
          SetmaxDropWithType(2600);
        } else if (res.data.type[0] === "Roman Skylight") {
          SetminWidthWithType(1000);
          SetmaxWidthWithType(2000);
          SetminDropWithType(1000);
          SetmaxDropWithType(4000);
        } else if (res.data.type[0] === "Panel") {
          SetminWidthWithType(800);
          SetmaxWidthWithType(4000);
          SetminDropWithType(1000);
          SetmaxDropWithType(3000);
        } else if (res.data.type[0] === "Roman") {
          SetminWidthWithType(350);
          SetmaxWidthWithType(2800);
          SetminDropWithType(1000);
          SetmaxDropWithType(4000);
        } else if (res.data.type[0] === "Colby Skylight") {
          SetminWidthWithType(1000);
          SetmaxWidthWithType(2000);
          SetminDropWithType(1000);
          SetmaxDropWithType(4000);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getProdcut();
  }, [id]);
  const [Lessminwidth, setLessminwidth] = useState(false);
  const [Lessmindrop, setLessmindrop] = useState(false);
  const handleNumbers = (e) => {
    const value = e.target.value;
    const getClass = e.target.className;
    if (getClass === "searchbox width") {
      if (value < minWidthWithType || value > maxWidthWithType) {
        setLessminwidth(true);
      } else {
        setLessminwidth(false);
      }
    } else if (getClass === "searchbox Drop") {
      if (value < minDropWithType || value > maxDropWithType) {
        setLessmindrop(true);
      } else {
        setLessmindrop(false);
      }
    }
  };
  const [Fabricget, setFabricget] = useState([]);
  const [IsLoadedfabric, setIsLoadedfabric] = useState(true);
  useEffect(() => {
    const getfabric = async () => {
      try {
        {
          const remainingFabrics = AllFabric.filter((fabricinn) =>
            product.fabrics.includes(fabricinn.uniquId)
          ).sort((a, b) => a.band.localeCompare(b.band));
          setFabricget(remainingFabrics);
          /* 
          for (const item of product.fabrics) {
            const getFabric = await publicRequest.get(
              `/Fabrics?FabricId=${item}`
            );
            let obj = [
              getFabric.data[0].band,
              getFabric.data[0].fabImg,
              getFabric.data[0].fabric,
              getFabric.data[0].fabricName,
              getFabric.data[0].uniquId,
            ];
            setFabricget((Fabricget) => [...Fabricget, obj]);
          } */
          setIsLoadedfabric(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getfabric();
  }, [product.fabrics, AllFabric]);
  console.log("Fabricget", Fabricget);
  const [Qtyvalue, setQutyvalue] = useState(1);
  const increasqty = () => {
    setQutyvalue(Qtyvalue + 1);
  };
  const Deincreasqty = () => {
    if (Qtyvalue > 1) {
      setQutyvalue(Qtyvalue - 1);
    }
  };

  const [cartbtndisable, setCartbtndisable] = useState(true);
  const [width, setwidth] = useState(0);
  const [drop, setdrop] = useState(0);
  const [IsLoadedPrice, setIsLoadedPrice] = useState(false);
  const [widthfromDb, setwidthfromDb] = useState(0);
  const [Bandforprice, setBandforprice] = useState("");
  const [Fabric, setFabric] = useState({});

  const [CassetteCost, setCassetteCost] = useState(0);
  const widthRef = useRef(0);
  const dropRef = useRef(0);
  useEffect(() => {}, [width, drop]);
  const handleInputChange = (e) => {
    if (Object.keys(Fabric).length !== 0) {
      if (e.target.name === "width") {
        setwidth(parseInt(e.target.value));
        widthRef.current = e.target.value;
      } else if (e.target.name === "Drop") {
        setdrop(parseInt(e.target.value));
        dropRef.current = e.target.value;
      }
      handelIsNull();
    } else {
      e.target.value = "";
      toast.error("You have to choose the fabric first.");
    }
  };
  const handalefabric = async (e) => {
    const { id, className, value, checked } = e.target;
    /* setwidth(0);
    setdrop(0); */
    /* document.querySelector(".searchbox.width").value = "";
    document.querySelector(".searchbox.Drop").value = ""; */
    const width = parseInt(widthRef.current);
    const drop = parseInt(dropRef.current);
    if (product.type[0] !== "Panel") {
      setIsLoadedPrice(true);
      if (
        width === null ||
        width === undefined ||
        width === "" ||
        width < minWidthWithType ||
        width > maxWidthWithType ||
        drop === null ||
        drop === undefined ||
        drop === "" ||
        drop > maxDropWithType ||
        drop < minDropWithType
      ) {
        setCartbtndisable(true);
      } else {
        const getPrice = await publicRequest.get(
          `/PriceOfProduct?width=${width}&drop=${drop}&band=${className}&type=${product.type[0]}`
        );
        setBliendPrice(getPrice.data.price);
        setInitialPrice(getPrice.data.price);
        setwidthfromDb(getPrice.data.width);
        setCartbtndisable(false);
        setIsLoadedPrice(false);
      }
    }

    setBandforprice(className);
    setFabric({ OptionName: "Fabric Option", optionData: id });

    const getsingaleFabric = await publicRequest.get(
      `/Fabrics?FabricId=${value}`
    );
    /* const imagephoto1 =
      "../assets/img/fabrics/febrickBlind/" + getsingaleFabric.data[0].img[0];
    const imagephoto2 =
      "../assets/img/fabrics/febrickBlind/" + getsingaleFabric.data[0].img[1];
    let obj = [imagephoto1, imagephoto2]; */
    setImages(getsingaleFabric.data[0].img);
    setImg(getsingaleFabric.data[0].img[0]);

    if (OperatingSystem !== null) {
      setOperatingSystem({});
      setMotoresprice(0);
      setRemoteprice(0);
      setAccessoriesprice(0);
    }
    if (Cassette !== null) {
      setCassetteCost(0);
      setShowDecoraruve(false);
      setShowDecoraruveisset(false);
      setCassette({});
    }
    if (Clutch !== null) {
      setClutchcostisset(false);
      setClutchcost(0);
      setClutch({});
    }
    if (SelectTrack !== null) {
      setTrack({});
      setShowSelectTrack(false);
    }
    if (pleat !== null) {
      setpleat({});
    }
    if (BottomDown !== null) {
      setBottomDown({});
    }
    if (DayNight !== null) {
      setDayNight({});
      setDayNightisset(false);
    }
    if (TopDownBottomUp !== null) {
      setTopDownBottomUp({});
      setTopDownBottomUpcost(0);
      setTopDownBottomUpisincrement(false);
      setShowTopDownBottomUp(false);
    }
    if (OneTouchDown !== null) {
      setOneTouchDown({});
      setOneTouchDowncost(0);
      setOneTouchDownisset(false);
    }
    if (LiningOption !== null) {
      setLiningOption({});
      setLiningOptioncost(0);
      setLiningOptioncostIsset(false);
      setShowBlackOutLining(false);
    }
    if (PlainCassette !== null) {
      setPlainCassette({});
      setPlainCassetteCost(0);
      setPlainCassetteCostIsset(false);
      setShowplainCassette(false);
    }
    if (OneTouchUp !== null) {
      setOneTouchUp({});
      setOneTouchUpCost(0);
      setOneTouchUpCostIsset(false);
    }
    if (AddSystem !== null) {
      setAddSystem({});
      setAddSystemCost(0);
      setAddSystemisset(false);
      setShowDecoraruve(false);
      setShowplainCassette(false);
    }
    if (PlainCassette !== null) {
      setPlainCassette({});
      setPlainCassetteCost(0);
      setPlainCassetteCostIsset(false);
    }
    setcolbymotoreIsset(false);
    setIsmotordmanuelTDBU(false);
    setIsmotordmanuelDaynight(false);
  };

  const handelIsNull = async (e) => {
    /* const width = document.getElementsByClassName("width")[0].value;
    setwidth(width);
    const drop = document.getElementsByClassName("Drop")[0].value;
    setdrop(drop); */
    const width = parseInt(widthRef.current);
    const drop = parseInt(dropRef.current);
    if (product.type[0] !== "Panel") {
      setIsLoadedPrice(true);
      if (
        width === null ||
        width === undefined ||
        width === "" ||
        width < minWidthWithType ||
        width > maxWidthWithType ||
        drop === null ||
        drop === undefined ||
        drop === "" ||
        drop > maxDropWithType ||
        drop < minDropWithType
      ) {
        setCartbtndisable(true);
      } else {
        const getPrice = await publicRequest.get(
          `/PriceOfProduct?width=${width}&drop=${drop}&band=${Bandforprice}&type=${product.type[0]}`
        );
        setBliendPrice(getPrice.data.price);
        setInitialPrice(getPrice.data.price);
        setwidthfromDb(getPrice.data.width);
        setCartbtndisable(false);
        setIsLoadedPrice(false);
      }
    }

    if (OperatingSystem !== null) {
      setOperatingSystem({});
      setMotoresprice(0);
      setRemoteprice(0);
      setAccessoriesprice(0);
    }
    if (Cassette !== null) {
      setCassetteCost(0);
      setShowDecoraruve(false);
      setShowDecoraruveisset(false);
      setCassette({});
    }
    if (Clutch !== null) {
      setClutchcostisset(false);
      setClutchcost(0);
      setClutch({});
    }
    if (SelectTrack !== null) {
      setTrack({});
      setShowSelectTrack(false);
    }
    if (pleat !== null) {
      setpleat({});
    }
    if (BottomDown !== null) {
      setBottomDown({});
    }
    if (DayNight !== null) {
      setDayNight({});
      setDayNightisset(false);
    }
    if (TopDownBottomUp !== null) {
      setTopDownBottomUp({});
      setTopDownBottomUpcost(0);
      setTopDownBottomUpisincrement(false);
      setShowTopDownBottomUp(false);
    }
    if (OneTouchDown !== null) {
      setOneTouchDown({});
      setOneTouchDowncost(0);
      setOneTouchDownisset(false);
    }
    if (LiningOption !== null) {
      setLiningOption({});
      setLiningOptioncost(0);
      setLiningOptioncostIsset(false);
      setShowBlackOutLining(false);
    }
    if (PlainCassette !== null) {
      setPlainCassette({});
      setPlainCassetteCost(0);
      setPlainCassetteCostIsset(false);
      setShowplainCassette(false);
    }
    if (OneTouchUp !== null) {
      setOneTouchUp({});
      setOneTouchUpCost(0);
      setOneTouchUpCostIsset(false);
    }
    if (AddSystem !== null) {
      setAddSystem({});
      setAddSystemCost(0);
      setAddSystemisset(false);
      setShowDecoraruve(false);
      setShowplainCassette(false);
    }
    /*  if (Headrail !== null) {
      setHeadrail({});
      setHeadrailCost(0);
      setHeadrailCostIsset(false);
      setShowHeadrail(false);
    } */
    if (PlainCassette !== null) {
      setPlainCassette({});
      setPlainCassetteCost(0);
      setPlainCassetteCostIsset(false);
    }
    setcolbymotoreIsset(false);
    setIsmotordmanuelTDBU(false);
    setIsmotordmanuelDaynight(false);
  };
  const [ShowOption, setShowOption] = useState(true);
  const togglemoreOption = () => {
    if (Object.keys(Fabric).length !== 0 && width > 0 && drop > 0) {
      setShowOption(!ShowOption);
    } else {
      toast.error("Some of the fields are empty or not selected.");
    }
  };
  const [pleat, setpleat] = useState({});
  const handalepleat = (e) => {
    const { id, checked } = e.target;
    setBliendPrice(InitialPrice);
    setClutch({});
    setBottomDown({});
    setDayNight({});
    setTopDownBottomUp({});
    setDayNightisset(false);
    setClutchcostisset(false);
    setTopDownBottomUpisincrement(false);
    setShowTopDownBottomUp(false);
    setcolbymotoreIsset(false);
    setIsmotordmanuelTDBU(false);
    setIsmotordmanuelDaynight(false);
    setClutchcost(0);
    setTopDownBottomUpcost(0);
    setpleat({ OptionName: "Pleat Size", optionData: id });
  };
  const [SelectTrack, setTrack] = useState({});
  const [ShowSelectTrack, setShowSelectTrack] = useState(false);
  const handaleSelectTrack = async (e) => {
    const { id, checked } = e.target;
    setShowSelectTrack(true);
    setIsLoadedPrice(true);
    if (
      width === null ||
      width === undefined ||
      width === "" ||
      width < minWidthWithType ||
      width > maxWidthWithType ||
      drop === null ||
      drop === undefined ||
      drop === "" ||
      drop > maxDropWithType ||
      drop < minDropWithType
    ) {
      setCartbtndisable(true);
    } else {
      const getPrice = await publicRequest.get(
        `/PriceOfProduct?width=${width}&drop=${drop}&band=${Bandforprice}&type=${product.type[0]}&Track=${id}`
      );
      setBliendPrice(getPrice.data.price);
      setInitialPrice(getPrice.data.price);
      setwidthfromDb(getPrice.data.width);
      setCartbtndisable(false);
      setIsLoadedPrice(false);
      setShowSelectTrack(false);
      setTrack({ OptionName: "Select Track", optionData: id });
    }
    if (OperatingSystem !== null) {
      setOperatingSystem({});
      setMotoresprice(0);
      setRemoteprice(0);
      setAccessoriesprice(0);
    }
  };
  const [Control, setControl] = useState({});
  const handaleControl = (e) => {
    const { id, checked } = e.target;
    setControl({ OptionName: "Control Option", optionData: id + " Side" });
  };

  const [Chain, setChain] = useState({});
  const handaleChain = (e) => {
    const { id, checked } = e.target;
    setChain({ OptionName: "Chain Control", optionData: id + " Chain" });
  };
  const [Stacking, setStacking] = useState({});
  const handaleStacking = (e) => {
    const { id, checked } = e.target;
    if (product.type[0] === "Panel") {
      if (SelectTrack.optionData === "3WayTrack") {
        if (id === "CenterSplit") {
          toast.error(
            "The center split option is available for 4 and 6 way track."
          );
          setStacking({});
        } else {
          setStacking({ OptionName: "Opening Direction", optionData: id });
        }
      } else {
        setStacking({ OptionName: "Opening Direction", optionData: id });
      }
    } else {
      setStacking({ OptionName: "Opening Direction", optionData: id });
    }
  };
  const [Mount, setMount] = useState({});
  const handaleMount = (e) => {
    const { id, checked } = e.target;
    setMount({ OptionName: "Mounting Bracket", optionData: id });
  };
  const [Hanger, setHanger] = useState({});
  const handaleHanger = (e) => {
    const { id, checked } = e.target;
    setHanger({ OptionName: "Ball Chain Hook", optionData: id });
  };
  const [Metel, setMetel] = useState({});
  const handaleMetel = (e) => {
    const { id, checked } = e.target;
    setMetel({ OptionName: "Metel Ball Chain", optionData: id });
  };
  const [Clutch, setClutch] = useState({});
  const [Clutchcost, setClutchcost] = useState(0);
  const [Clutchcostisset, setClutchcostisset] = useState(false);
  const [colbymotoreIsset, setcolbymotoreIsset] = useState(false);
  const handaleClutch = (e) => {
    const { id, checked } = e.target;
    if (id === "YesClutch") {
      if (colbymotoreIsset) {
        toast.error(
          "You can select only one of these operating systems Clutch, Day & Night, Top Down Bottom Up, and Bottom Down."
        );
      } else {
        if (pleat.optionData === "38mm") {
          if (width >= 550 && drop >= 1000 && width <= 2200 && drop <= 2400) {
            setClutchcost(38);
            if (!Clutchcostisset) {
              setBliendPrice(BliendPrice + 38);
            }
            setClutchcostisset(true);
            setcolbymotoreIsset(true);
            setClutch({
              OptionName: "Clutch Operating System",
              optionData: id,
            });
          } else {
            setClutchcost(0);
            setClutchcostisset(false);
            if (Clutchcostisset) {
              setBliendPrice(BliendPrice - Clutchcost);
            }
            setClutch({});
            toast.error(
              "Width should be between 550 - 2200 MM and Drop should be between 1000 - 2400 MM."
            );
          }
        } else {
          setClutchcost(0);
          setClutchcostisset(false);
          if (Clutchcostisset) {
            setBliendPrice(BliendPrice - Clutchcost);
          }
          setClutch({});
          toast.error("Pleat Size must be 38MM.");
        }
      }
    } else {
      setClutchcost(0);
      setClutchcostisset(false);
      if (
        BottomDown.optionData !== "YesBottomDown" &&
        DayNight.optionData !== "Manual" &&
        DayNight.optionData !== "Motorized" &&
        TopDownBottomUp.optionData !== "Manual" &&
        TopDownBottomUp.optionData !== "Motorized"
      ) {
        setcolbymotoreIsset(false);
      }
      if (Clutchcostisset) {
        setBliendPrice(BliendPrice - Clutchcost);
      }
      setClutch({ OptionName: "Clutch Operating System", optionData: id });
    }
  };
  const [BottomDown, setBottomDown] = useState({});
  const handaleBottomDown = (e) => {
    const { id, checked } = e.target;
    if (id === "YesBottomDown") {
      if (colbymotoreIsset) {
        toast.error(
          "You can select only one of these operating systems Clutch, Day & Night, Top Down Bottom Up, and Bottom Down."
        );
      } else {
        if (pleat.optionData === "38mm") {
          if (width >= 700 && drop >= 1000 && width <= 3000 && drop <= 5000) {
            setBottomDown({
              OptionName: "Motorised Bottom Down System",
              optionData: id,
            });
            setcolbymotoreIsset(true);
          } else {
            toast.error(
              "Width should be between 700 - 3000 MM and Drop should be between 1000 - 5000 MM."
            );
            setBottomDown({});
          }
        } else {
          setBottomDown({});
          toast.error("Pleat Size must be 38MM.");
        }
      }
    } else {
      if (width <= 2500 && drop <= 3000) {
        setBottomDown({
          OptionName: "Motorised Bottom Down System",
          optionData: id,
        });
        if (
          Clutch.optionData !== "YesClutch" &&
          DayNight.optionData !== "Manual" &&
          DayNight.optionData !== "Motorized" &&
          TopDownBottomUp.optionData !== "Manual" &&
          TopDownBottomUp.optionData !== "Motorized"
        ) {
          setcolbymotoreIsset(false);
        }
      } else {
        setBottomDown({});
        toast.error(
          "Width should be less than or equal to 2500 MM and Drop should be less than or equal to 3000 MM."
        );
      }
    }
  };
  const [DayNight, setDayNight] = useState({});
  const [DayNightcostisset, setDayNightisset] = useState(false);
  const [IsmotordmanuelDaynight, setIsmotordmanuelDaynight] = useState(false);
  const handaleDayNight = (e) => {
    const { id, checked } = e.target;
    if (id === "Manual" || id === "Motorized") {
      if (colbymotoreIsset && !IsmotordmanuelDaynight) {
        toast.error(
          "You can select only one of these operating systems Clutch, Day & Night, Top Down Bottom Up, and Bottom Down."
        );
      } else {
        if (
          (pleat.optionData === "38mm" && id === "Motorized") ||
          (pleat.optionData === "26mm" && id === "Manual")
        ) {
          if (
            (id === "Motorized" &&
              width >= 700 &&
              drop >= 1000 &&
              width <= 3000 &&
              drop <= 3500) ||
            (id === "Manual" && width <= 2500 && drop <= 3000)
          ) {
            setDayNight({
              OptionName: "Day & Night",
              optionData: id,
            });
            setDayNightisset(true);
            if (!DayNightcostisset) {
              setBliendPrice(BliendPrice + InitialPrice);
            }
            setIsmotordmanuelDaynight(true);
            setcolbymotoreIsset(true);
          } else {
            setDayNightisset(false);
            setDayNight({});
            if (DayNightcostisset) {
              setBliendPrice(BliendPrice - InitialPrice);
            }
            if (id === "Manual") {
              toast.error(
                "Width should be less than or equal to 2500 MM and Drop should be less than or equal to 3000 MM."
              );
            } else if (id === "Motorized") {
              toast.error(
                "Width should be between 700 - 3000 MM and Drop should be between 1000 - 3500 MM."
              );
            }
          }
        } else {
          setDayNightisset(false);
          setDayNight({});
          if (DayNightcostisset) {
            setBliendPrice(BliendPrice - InitialPrice);
          }
          if (id === "Manual") {
            toast.error("Pleat Size must be 26MM.");
          } else if (id === "Motorized") {
            toast.error("Pleat Size must be 38MM.");
          }
        }
      }
    } else {
      setDayNight({
        OptionName: "Day & Night",
        optionData: id,
      });
      setDayNightisset(false);
      if (DayNightcostisset) {
        setBliendPrice(BliendPrice - InitialPrice);
      }
      if (
        Clutch.optionData !== "YesClutch" &&
        BottomDown.optionData !== "YesBottomDown" &&
        TopDownBottomUp.optionData !== "Manual" &&
        TopDownBottomUp.optionData !== "Motorized"
      ) {
        setcolbymotoreIsset(false);
      }
      setIsmotordmanuelDaynight(false);
    }
  };
  const [TopDownBottomUp, setTopDownBottomUp] = useState({});
  const [TopDownBottomUpcost, setTopDownBottomUpcost] = useState(0);
  const [TopDownBottomUpisincrement, setTopDownBottomUpisincrement] =
    useState(false);
  const [ShowTopDownBottomUp, setShowTopDownBottomUp] = useState(false);
  const [IsmotordmanuelTDBU, setIsmotordmanuelTDBU] = useState(false);
  const handaleTopDownBottomUp = async (e) => {
    const { id, name, checked } = e.target;
    setIsLoadedPrice(true);
    setShowTopDownBottomUp(true);
    if (id === "Manual" || id === "Motorized") {
      if (colbymotoreIsset && !IsmotordmanuelTDBU) {
        toast.error(
          "You can select only one of these operating systems Clutch, Day & Night, Top Down Bottom Up, and Bottom Down."
        );
        setIsLoadedPrice(false);
        setShowTopDownBottomUp(false);
      } else {
        if (
          (pleat.optionData === "38mm" && id === "Motorized") ||
          (pleat.optionData === "26mm" && id === "Manual")
        ) {
          if (
            (id === "Motorized" &&
              width >= 700 &&
              drop >= 1000 &&
              width <= 3000 &&
              drop <= 3500) ||
            (id === "Manual" && width <= 2500 && drop <= 3000)
          ) {
            if (!TopDownBottomUpisincrement) {
              await userRequest
                .get(
                  `/Additionalcost/singlecost?width=${width}&addingType=${name}&blindType=${product.type[0]}`
                )
                .then((response) => {
                  setTopDownBottomUpcost(response.data.price);
                  setIsLoadedPrice(false);
                  setShowTopDownBottomUp(false);
                  setTopDownBottomUpisincrement(true);
                  setBliendPrice(BliendPrice + response.data.price);
                  setTopDownBottomUp({
                    OptionName: "Top Down Bottom Up",
                    optionData: id,
                  });
                  setIsmotordmanuelTDBU(true);
                  setcolbymotoreIsset(true);
                })
                .catch((error) => console.error(error));
            } else {
              setIsLoadedPrice(false);
              setShowTopDownBottomUp(false);
              setTopDownBottomUp({
                OptionName: "Top Down Bottom Up",
                optionData: id,
              });
            }
          } else {
            setTopDownBottomUp({});
            setTopDownBottomUpisincrement(false);
            if (TopDownBottomUpisincrement) {
              setBliendPrice(BliendPrice - TopDownBottomUpcost);
            }
            setIsLoadedPrice(false);
            setShowTopDownBottomUp(false);
            if (id === "Manual") {
              toast.error(
                "Width should be less than or equal to 2500 MM and Drop should be less than or equal to 3000 MM."
              );
            } else if (id === "Motorized") {
              toast.error(
                "Width should be between 700 - 3000 MM and Drop should be between 1000 - 3500 MM."
              );
            }
          }
        } else {
          setIsLoadedPrice(false);
          setShowTopDownBottomUp(false);
          setTopDownBottomUp({});
          setTopDownBottomUpisincrement(false);
          if (TopDownBottomUpisincrement) {
            setBliendPrice(BliendPrice - TopDownBottomUpcost);
          }
          if (id === "Manual") {
            toast.error("Pleat Size must be 26MM.");
          } else if (id === "Motorized") {
            toast.error("Pleat Size must be 38MM.");
          }
        }
      }
    } else {
      setIsLoadedPrice(false);
      setShowTopDownBottomUp(false);
      setTopDownBottomUpisincrement(false);
      if (TopDownBottomUpisincrement) {
        setBliendPrice(BliendPrice - TopDownBottomUpcost);
      }
      setTopDownBottomUp({
        OptionName: "Top Down Bottom Up",
        optionData: id,
      });
      setCassetteCost(0);
      if (
        Clutch.optionData !== "YesClutch" &&
        BottomDown.optionData !== "YesBottomDown" &&
        DayNight.optionData !== "Manual" &&
        DayNight.optionData !== "Motorized"
      ) {
        setcolbymotoreIsset(false);
      }
      setIsmotordmanuelTDBU(false);
    }
  };
  const [OneTouchDown, setOneTouchDown] = useState({});
  const [OneTouchDowncost, setOneTouchDowncost] = useState(0);
  const [OneTouchDownisset, setOneTouchDownisset] = useState(false);
  const handaleOneTouchDown = (e) => {
    const { id, checked } = e.target;
    if (id === "YesOneTouchDown") {
      if (width >= 750 && drop >= 1000 && width <= 2600 && drop <= 2700) {
        setOneTouchDowncost(45);
        if (!OneTouchDownisset) {
          setBliendPrice(BliendPrice + 45);
        }
        setOneTouchDownisset(true);
        setOneTouchDown({
          OptionName: "One Touch Down System",
          optionData: id,
        });
      } else {
        setOneTouchDowncost(0);
        setOneTouchDownisset(false);
        if (OneTouchDownisset) {
          setBliendPrice(BliendPrice - OneTouchDowncost);
        }
        setOneTouchDown({});
        toast.error(
          "Width should be between 750 - 2600 MM and Drop should be between 1000 - 2700 MM."
        );
      }
    } else {
      setOneTouchDowncost(0);
      setOneTouchDownisset(false);
      if (OneTouchDownisset) {
        setBliendPrice(BliendPrice - OneTouchDowncost);
      }
      setOneTouchDown({ OptionName: "One Touch Down System", optionData: id });
    }
  };

  const [LiningOption, setLiningOption] = useState({});
  const [LiningOptioncost, setLiningOptioncost] = useState(0);
  const [LiningOptioncostIsset, setLiningOptioncostIsset] = useState(false);
  const [ShowBlackOutLining, setShowBlackOutLining] = useState(false);
  const handaleLiningOption = async (e) => {
    const { id, checked } = e.target;
    const datatype = e.target.getAttribute("datatype");
    setIsLoadedPrice(true);
    setShowBlackOutLining(true);
    if (id === "BlackOut" || id === "Translicent") {
      if (width >= 350 && drop >= 1000 && width <= 2800 && drop <= 4000) {
        await userRequest
          .get(
            `/Additionalcost/singlecost?width=${width}&drop=${drop}&addingType=${datatype}&blindType=${product.type[0]}`
          )
          .then((response) => {
            setLiningOptioncost(response.data.price);
            setIsLoadedPrice(false);
            setLiningOptioncostIsset(true);
            setShowBlackOutLining(false);
            setBliendPrice(
              (prevPrice) => prevPrice - LiningOptioncost + response.data.price
            );

            setLiningOption({
              OptionName: "Lining Option",
              optionData: id,
            });
          })
          .catch((error) => console.error(error));
      } else {
        setLiningOption({});
        if (LiningOptioncostIsset) {
          setBliendPrice((prevPrice) => prevPrice - LiningOptioncost);
        }
        setLiningOptioncostIsset(false);
        setShowBlackOutLining(false);
        setLiningOptioncost(0);
        setIsLoadedPrice(false);
        toast.error(
          "Width should be between 350 - 2800 MM and Drop should be between 1000 - 4000 MM."
        );
      }
    } else {
      setLiningOption({
        OptionName: "Lining Option",
        optionData: id,
      });
      if (LiningOptioncostIsset) {
        setBliendPrice(BliendPrice - LiningOptioncost);
      }
      setLiningOptioncostIsset(false);
      setShowBlackOutLining(false);
      setLiningOptioncost(0);
      setIsLoadedPrice(false);
    }
  };
  const [OneTouchUp, setOneTouchUp] = useState({});
  const [OneTouchUpCost, setOneTouchUpCost] = useState(0);
  const [OneTouchUpCostIsset, setOneTouchUpCostIsset] = useState(false);
  const handaleOneTouchUp = async (e) => {
    const { id, checked } = e.target;
    setIsLoadedPrice(true);
    setOperatingSystem({});

    if (id === "YesOneTouchUp") {
      if (
        product.type[0] === "Roller" &&
        (PlainCassetteCostIsset || ShowDecoraruveisset)
      ) {
        setOneTouchUp({});
        if (OneTouchUpCostIsset) {
          setBliendPrice(BliendPrice - OneTouchUpCost);
        }
        setOneTouchUpCost(0);
        setOneTouchUpCostIsset(false);
        setIsLoadedPrice(false);
        toast.error(
          "You can not select this option because you select yes to only one of these One Touch Up System / Plain/Decorative Cassettes."
        );
      } else {
        if (width && drop) {
          if (width > 2500 || drop > 2600 || width < 750 || drop < 1000) {
            setOneTouchUp({});
            if (OneTouchUpCostIsset) {
              setBliendPrice(BliendPrice - OneTouchUpCost);
            }
            setOneTouchUpCost(0);
            setOneTouchUpCostIsset(false);
            setIsLoadedPrice(false);
          } else {
            setOneTouchUpCost(38);
            setIsLoadedPrice(false);
            setOneTouchUpCostIsset(true);
            setBliendPrice(BliendPrice + 38);
            setOneTouchUp({
              OptionName: "One Touch Up System",
              optionData: id,
            });
          }
        } else {
          setOneTouchUp({});
          if (OneTouchUpCostIsset) {
            setBliendPrice(BliendPrice - OneTouchUpCost);
          }
          setOneTouchUpCost(0);
          setOneTouchUpCostIsset(false);
          setIsLoadedPrice(false);
          toast.error("empty field width/drop.");
        }
      }
    } else {
      setOneTouchUp({
        OptionName: "One Touch Up System",
        optionData: id,
      });
      if (OneTouchUpCostIsset) {
        setBliendPrice(BliendPrice - OneTouchUpCost);
      }
      setOneTouchUpCost(0);
      setOneTouchUpCostIsset(false);
      setIsLoadedPrice(false);
    }
  };
  /*  const [Headrail, setHeadrail] = useState({});
  const [HeadrailCost, setHeadrailCost] = useState(0);
  const [HeadrailCostIsset, setHeadrailCostIsset] = useState(false);
  const [ShowHeadrail, setShowHeadrail] = useState(false);
  const handaleHeadrail = async (e) => {
    const { id, name, checked } = e.target;
    setShowHeadrail(true);
    setIsLoadedPrice(true);
    setOperatingSystem({});
    if (id === "YesHeadrail") {
      if (width && drop) {
        if (width > 2400 || drop > 2500) {
          setHeadrail({});
          if (HeadrailCostIsset) {
            setBliendPrice(BliendPrice - HeadrailCost);
          }
          setHeadrailCost(0);
          setHeadrailCostIsset(false);
          setIsLoadedPrice(false);
          setShowHeadrail(false);
        } else {
          await userRequest
            .get(
              `/Additionalcost/singlecost?width=${width}&addingType=${name}&blindType=${product.type[0]}`
            )
            .then((response) => {
              setHeadrailCost(response.data.price);
              setIsLoadedPrice(false);
              setHeadrailCostIsset(true);
              setShowHeadrail(false);
              setBliendPrice(BliendPrice + response.data.price);
              setHeadrail({
                OptionName: "Headrail",
                optionData: id,
              });
            })
            .catch((error) => console.log(error.response.data));
        }
      } else {
        setHeadrail({});
        if (HeadrailCostIsset) {
          setBliendPrice(BliendPrice - HeadrailCost);
        }
        setHeadrailCost(0);
        setHeadrailCostIsset(false);
        setIsLoadedPrice(false);
        setShowHeadrail(false);
      }
    } else {
      setHeadrail({
        OptionName: "Headrail",
        optionData: id,
      });
      if (HeadrailCostIsset) {
        setBliendPrice(BliendPrice - HeadrailCost);
      }
      setHeadrailCost(0);
      setHeadrailCostIsset(false);
      setIsLoadedPrice(false);
      setShowHeadrail(false);
    }
  }; */
  const [PlainCassette, setPlainCassette] = useState({});
  const [PlainCassetteCost, setPlainCassetteCost] = useState(0);
  const [PlainCassetteCostIsset, setPlainCassetteCostIsset] = useState(false);
  const [ShowplainCassette, setShowplainCassette] = useState(false);
  const handalePlainCassette = async (e) => {
    const { id, name, checked } = e.target;
    setIsLoadedPrice(true);
    setShowplainCassette(true);
    setOperatingSystem({});
    /*   */
    if (id === "YesPlainCassette") {
      if (
        product.type[0] === "Roller" &&
        (OneTouchUpCostIsset || ShowDecoraruveisset)
      ) {
        setPlainCassette({});
        setPlainCassetteCost(0);
        setPlainCassetteCostIsset(false);
        setShowplainCassette(false);
        setIsLoadedPrice(false);
        toast.error(
          "You can not select this option because you select yes to only one of these One Touch Up System / Plain/Decorative Cassettes."
        );
      } else {
        if (width && drop) {
          if (
            width > MaxoparatingmoterPlainWidth ||
            drop > MaxoparatingmoterPlainDrop
          ) {
            setPlainCassette({});
            if (PlainCassetteCostIsset) {
              setBliendPrice(BliendPrice - PlainCassetteCost);
            }
            setPlainCassetteCost(0);
            setPlainCassetteCostIsset(false);
            setIsLoadedPrice(false);
            setShowplainCassette(false);
          } else {
            await userRequest
              .get(
                `/Additionalcost/singlecost?width=${width}&addingType=${name}&blindType=${product.type[0]}`
              )
              .then((response) => {
                setPlainCassetteCost(response.data.price);
                setIsLoadedPrice(false);
                setShowplainCassette(false);
                setPlainCassetteCostIsset(true);
                setBliendPrice(BliendPrice + response.data.price);
                setPlainCassette({
                  OptionName: "Plain Cassette",
                  optionData: id,
                });
              })
              .catch((error) => console.log(error.response.data));
          }
        } else {
          setPlainCassette({});
          setIsLoadedPrice(false);
          if (PlainCassetteCostIsset) {
            setBliendPrice(BliendPrice - PlainCassetteCost);
          }
          setPlainCassetteCost(0);
          setPlainCassetteCostIsset(false);
          setShowplainCassette(false);
          toast.error("empty field width/drop.");
        }
      }
    } else {
      setIsLoadedPrice(false);
      if (PlainCassetteCostIsset) {
        setBliendPrice(BliendPrice - PlainCassetteCost);
      }
      setPlainCassetteCostIsset(false);
      setShowplainCassette(false);
      setPlainCassette({
        OptionName: "Plain Cassette",
        optionData: id,
      });
      setPlainCassetteCost(0);
    }
  };
  const [Cassette, setCassette] = useState({});
  const [ShowDecoraruve, setShowDecoraruve] = useState(false);
  const [ShowDecoraruveisset, setShowDecoraruveisset] = useState(false);
  const handaleCassette = async (e) => {
    const { id, name, checked } = e.target;
    setIsLoadedPrice(true);
    setShowDecoraruve(true);
    setOperatingSystem({});
    if (id === "YesDecoraruveCassette") {
      if (
        product.type[0] === "Roller" &&
        (OneTouchUpCostIsset || PlainCassetteCostIsset)
      ) {
        setCassette({});
        setIsLoadedPrice(false);
        setShowDecoraruve(false);
        setShowDecoraruveisset(false);
        toast.error(
          "You can not select this option because you select yes to only one of these One Touch Up System / Plain/Decorative Cassettes."
        );
      } else {
        if (width && drop) {
          if (
            width > MaxoparatingmoterDecoraruveWidth ||
            drop > MaxoparatingmoterDecoraruveDrop
          ) {
            e.target.checked = false;
            setCassette({});
            setIsLoadedPrice(false);
            setShowDecoraruve(false);
            setShowDecoraruveisset(false);
            toast.error(
              `The width should be less than ${MaxoparatingmoterDecoraruveWidth} MM and also drop should be less than ${MaxoparatingmoterDecoraruveDrop} MM.`
            );
          } else {
            await userRequest
              .get(
                `/Additionalcost/singlecost?width=${width}&addingType=${name}&blindType=${product.type[0]}`
              )
              .then((response) => {
                setCassetteCost(response.data.price);
                setIsLoadedPrice(false);
                setShowDecoraruve(false);
                setShowDecoraruveisset(true);
                setBliendPrice(BliendPrice + response.data.price);
                setCassette({
                  OptionName: "Decorative Cassette",
                  optionData: id,
                });
              })
              .catch((error) => console.error(error));
          }
        } else {
          setIsLoadedPrice(false);
          setShowDecoraruve(false);
          setShowDecoraruveisset(false);
          setBliendPrice(BliendPrice - CassetteCost);
          setCassetteCost(0);
          setCassette({});
          toast.error("empty field width/drop.");
        }
      }
    } else {
      if (
        width > MaxoparatingmoterDecoraruveWidth ||
        drop > MaxoparatingmoterPlainDrop
      ) {
        e.target.checked = false;
        setCassette({});
        setIsLoadedPrice(false);
        setShowDecoraruve(false);
        setShowDecoraruveisset(false);
        toast.error(
          `The width should be less than ${MaxoparatingmoterDecoraruveWidth} MM and also drop should be less than ${MaxoparatingmoterPlainDrop} MM.`
        );
      } else {
        setIsLoadedPrice(false);
        setBliendPrice(BliendPrice - CassetteCost);
        setCassette({ OptionName: "Decorative Cassette", optionData: id });
        setCassetteCost(0);
        setShowDecoraruve(false);
        setShowDecoraruveisset(false);
      }
    }
  };

  const [AddSystem, setAddSystem] = useState({});
  const [AddSystemCost, setAddSystemCost] = useState(0);
  const [AddSystemsset, setAddSystemisset] = useState(false);
  const handaleAddSystem = async (e) => {
    const { id, checked } = e.target;
    setIsLoadedPrice(true);
    setOperatingSystem({});
    setMotoresprice(0);
    setRemoteprice(0);
    setAccessoriesprice(0);
    if (width && drop) {
      if (id === "OneTouchUp") {
        if (width > 2500 || drop > 2600 || width < 750 || drop < 1000) {
          setIsLoadedPrice(false);
          setAddSystem({});
          if (AddSystemsset) {
            setBliendPrice(BliendPrice - AddSystemCost);
          }
          setAddSystemCost(0);
          setAddSystemisset(false);
          toast.error(
            "Width should be between 750 - 2500 MM and Drop should be between 1000 - 2600 MM."
          );
        } else {
          setAddSystemCost(38);
          setIsLoadedPrice(false);
          setAddSystemisset(true);
          setBliendPrice((prevPrice) => prevPrice - AddSystemCost + 38);
          setAddSystem({ OptionName: "Add On System", optionData: id });
        }
      } else if (id === "DirectFix") {
        setAddSystemCost(0);
        setIsLoadedPrice(false);
        setAddSystemisset(false);
        if (AddSystemsset) {
          setBliendPrice(BliendPrice - AddSystemCost);
        }
        setAddSystem({ OptionName: "Add On System", optionData: id });
      } else if (id === "PlainCassette") {
        setShowplainCassette(true);
        if (
          width > MaxoparatingmoterPlainWidth ||
          drop > MaxoparatingmoterPlainDrop
        ) {
          setIsLoadedPrice(false);
          setAddSystem({});
          if (AddSystemsset) {
            setBliendPrice(BliendPrice - AddSystemCost);
          }
          setAddSystemCost(0);
          setAddSystemisset(false);
          setShowplainCassette(false);
          toast.error(
            `The width should be less than ${MaxoparatingmoterPlainWidth} MM and also drop should be less than ${MaxoparatingmoterPlainDrop} MM.`
          );
        } else {
          await userRequest
            .get(
              `/Additionalcost/singlecost?width=${width}&addingType=plainCassette&blindType=${product.type[0]}`
            )
            .then((response) => {
              setAddSystemCost(response.data.price);
              setIsLoadedPrice(false);
              setShowplainCassette(false);
              setAddSystemisset(true);
              setBliendPrice(
                (prevPrice) => prevPrice - AddSystemCost + response.data.price
              );
              setAddSystem({ OptionName: "Add On System", optionData: id });
            })
            .catch((error) => console.log(error.response.data));
        }
      } else if (id === "DecorativeCassette") {
        setShowDecoraruve(true);
        if (
          width > MaxoparatingmoterDecoraruveWidth ||
          drop > MaxoparatingmoterDecoraruveDrop
        ) {
          setIsLoadedPrice(false);
          setAddSystem({});
          if (AddSystemsset) {
            setBliendPrice(BliendPrice - AddSystemCost);
          }
          setAddSystemCost(0);
          setAddSystemisset(false);
          setShowDecoraruve(false);
          toast.error(
            `The width should be less than ${MaxoparatingmoterDecoraruveWidth} MM and also drop should be less than ${MaxoparatingmoterDecoraruveDrop} MM.`
          );
        } else {
          await userRequest
            .get(
              `/Additionalcost/singlecost?width=${width}&addingType=Decoraruve&blindType=${product.type[0]}`
            )
            .then((response) => {
              setAddSystemCost(response.data.price);
              setIsLoadedPrice(false);
              setShowDecoraruve(false);
              setAddSystemisset(true);
              setBliendPrice(
                (prevPrice) => prevPrice - AddSystemCost + response.data.price
              );
              setAddSystem({ OptionName: "Add On System", optionData: id });
            })
            .catch((error) => console.error(error));
        }
      }
    } else {
      setIsLoadedPrice(false);
      setAddSystem({});
      if (AddSystemsset) {
        setBliendPrice(BliendPrice - AddSystemCost);
      }
      setAddSystemCost(0);
      setAddSystemisset(false);
      toast.error("empty field width/drop.");
    }
  };
  const [OperatingSystem, setOperatingSystem] = useState({});

  const handaleOperatingSystem = (e) => {
    const { id, checked } = e.target;
    if (width !== 0 && drop !== 0) {
      if (id === "Manual") {
        let minwidthMOtor, maxwidthMOtor, minDropMOtor, maxDropMOtor;
        if (product.type[0] === "Vertical") {
          minwidthMOtor = 500;
          maxwidthMOtor = 3000;
          minDropMOtor = 500;
          maxDropMOtor = 4000;
        } else if (product.type[0] === "Wooden") {
          minwidthMOtor = 500;
          maxwidthMOtor = 2400;
          minDropMOtor = 1000;
          maxDropMOtor = 2500;
        } else if (product.type[0] === "Sierra") {
          minwidthMOtor = 700;
          maxwidthMOtor = 3000;
          minDropMOtor = 1000;
          maxDropMOtor = 2800;
        } else if (product.type[0] === "Patricia") {
          minwidthMOtor = 750;
          maxwidthMOtor = 3000;
          minDropMOtor = 1000;
          maxDropMOtor = 3500;
        } else if (
          product.type[0] === "Meliso" ||
          product.type[0] === "Dorren" ||
          product.type[0] === "Grayson"
        ) {
          minwidthMOtor = 300;
          minDropMOtor = 500;
          if (Cassette.optionData === "YesDecoraruveCassette") {
            maxwidthMOtor = MaxoparatingmanualDecoraruveWidth;
            maxDropMOtor = MaxoparatingmanualDecoraruveDrop;
          } else {
            maxwidthMOtor = MaxoparatingmanualPlainWidth;
            maxDropMOtor = MaxoparatingmanualPlainDrop;
          }
        } else if (product.type[0] === "Luzon") {
          minwidthMOtor = 350;
          minDropMOtor = 500;
          if (Cassette.optionData === "YesDecoraruveCassette") {
            maxwidthMOtor = MaxoparatingmanualDecoraruveWidth;
            maxDropMOtor = MaxoparatingmanualDecoraruveDrop;
          } else {
            maxwidthMOtor = MaxoparatingmanualPlainWidth;
            maxDropMOtor = MaxoparatingmanualPlainDrop;
          }
        } else if (product.type[0] === "Panel") {
          minwidthMOtor = 800;
          maxwidthMOtor = 3000;
          minDropMOtor = 1000;
          maxDropMOtor = 2800;
        } else if (product.type[0] === "Roman") {
          minwidthMOtor = 350;
          maxwidthMOtor = 2600;
          minDropMOtor = 1000;
          maxDropMOtor = 3000;
        } else if (product.type[0] === "Roller") {
          if (AddSystem.optionData === "OneTouchUp") {
            minwidthMOtor = 750;
            minDropMOtor = 1000;
          } else {
            minwidthMOtor = 300;
            minDropMOtor = 300;
          }
          /*  if (Headrail.optionData === "YesHeadrail") {
            maxwidthMOtor = 2400;
            maxDropMOtor = 2300;
          } else */ if (AddSystem.optionData === "PlainCassette") {
            maxwidthMOtor = 2500;
            maxDropMOtor = 4000;
          } else if (AddSystem.optionData === "DecorativeCassette") {
            maxwidthMOtor = 2500;
            maxDropMOtor = 3500;
          } else if (AddSystem.optionData === "OneTouchUp") {
            maxwidthMOtor = 2500;
            maxDropMOtor = 2600;
          } else if (AddSystem.optionData === "DirectFix") {
            maxwidthMOtor = 2500;
            maxDropMOtor = 3000;
          }
        }

        if (
          width >= minwidthMOtor &&
          drop >= minDropMOtor &&
          width <= maxwidthMOtor &&
          drop <= maxDropMOtor
        ) {
          setMotoresprice(0);
          setRemoteprice(0);
          setAccessoriesprice(0);
          setOperatingSystem({ OperatingSystemName: null });
        } else {
          setMotoresprice(0);
          setRemoteprice(0);
          setAccessoriesprice(0);
          setOperatingSystem({});
          e.target.checked = false;
          setLessminwidth(true);
          toast.error(
            "The Manual option is disabled because some of the options you selected are not allowing that."
          );
        }
      } else {
        let minwidthMOtor, maxwidthMOtor, minDropMOtor, maxDropMOtor;
        if (product.type[0] === "Vertical") {
          minwidthMOtor = 700;
          maxwidthMOtor = 4000;
          minDropMOtor = 1000;
          maxDropMOtor = 4000;
        } else if (product.type[0] === "Wooden") {
          minwidthMOtor = 700;
          maxwidthMOtor = 2900;
          minDropMOtor = 1000;
          maxDropMOtor = 3500;
        } else if (product.type[0] === "Sierra") {
          minwidthMOtor = 700;
          maxwidthMOtor = 4000;
          minDropMOtor = 1000;
          maxDropMOtor = 2800;
        } else if (product.type[0] === "Patricia") {
          minwidthMOtor = 750;
          maxwidthMOtor = 3500;
          minDropMOtor = 1000;
          maxDropMOtor = 4000;
        } else if (product.type[0] === "Meliso") {
          minwidthMOtor = 700;
          minDropMOtor = 600;
          if (Cassette.optionData === "YesDecoraruveCassette") {
            maxwidthMOtor = MaxoparatingmoterDecoraruveWidth;
            maxDropMOtor = MaxoparatingmoterDecoraruveDrop;
          } else {
            maxwidthMOtor = MaxoparatingmoterPlainWidth;
            maxDropMOtor = MaxoparatingmoterPlainDrop;
          }
        } else if (product.type[0] === "Luzon") {
          minwidthMOtor = 700;
          minDropMOtor = 700;
          if (Cassette.optionData === "YesDecoraruveCassette") {
            maxwidthMOtor = MaxoparatingmoterDecoraruveWidth;
            maxDropMOtor = MaxoparatingmoterDecoraruveDrop;
          } else {
            maxwidthMOtor = MaxoparatingmoterPlainWidth;
            maxDropMOtor = MaxoparatingmoterPlainDrop;
          }
        } else if (
          product.type[0] === "Grayson" ||
          product.type[0] === "Dorren"
        ) {
          minwidthMOtor = 700;
          minDropMOtor = 500;
          if (Cassette.optionData === "YesDecoraruveCassette") {
            maxwidthMOtor = MaxoparatingmoterDecoraruveWidth;
            maxDropMOtor = MaxoparatingmoterDecoraruveDrop;
          } else {
            maxwidthMOtor = MaxoparatingmoterPlainWidth;
            maxDropMOtor = MaxoparatingmoterPlainDrop;
          }
        } else if (product.type[0] === "Panel") {
          minwidthMOtor = 800;
          maxwidthMOtor = 4000;
          minDropMOtor = 1000;
          maxDropMOtor = 3000;
        } else if (product.type[0] === "Roman") {
          minwidthMOtor = 700;
          maxwidthMOtor = 2800;
          minDropMOtor = 1000;
          maxDropMOtor = 4000;
        } else if (product.type[0] === "Roller") {
          if (AddSystem.optionData !== "OneTouchUp") {
            minwidthMOtor = 700;
            minDropMOtor = 500;
          }
          /*  if (Headrail.optionData === "YesHeadrail") {
            maxwidthMOtor = 2400;
            maxDropMOtor = 2500;
          } else */ if (AddSystem.optionData === "PlainCassette") {
            maxwidthMOtor = 3000;
            maxDropMOtor = 6000;
          } else if (AddSystem.optionData === "DecorativeCassette") {
            maxwidthMOtor = 3000;
            maxDropMOtor = 4000;
          } else if (AddSystem.optionData === "DirectFix") {
            maxwidthMOtor = 3000;
            maxDropMOtor = 6000;
          }
        }
        if (
          width >= minwidthMOtor &&
          drop >= minDropMOtor &&
          width <= maxwidthMOtor &&
          drop <= maxDropMOtor
        ) {
          setOperatingSystem({ OperatingSystemName: id });
        } else {
          setOperatingSystem({});
          e.target.checked = false;
          setLessminwidth(true);
          toast.error(
            "The Motorised option is disabled because some of the options you selected are not allowing that."
          );
        }
      }
      /* } else {
        if (id !== "Manual") {
          setOperatingSystem({ OperatingSystemName: id });
        } else {
          setMotoresprice(0);
          setRemoteprice(0);
          setAccessoriesprice(0);
          setOperatingSystem({ OperatingSystemName: null });
        }
      } */
    } else {
      e.target.checked = false;
      setLessminwidth(true);
    }
  };
  const [SelectMotores, setSelectMotores] = useState({
    MotoreHead: "Motor",
    Motorecode: "no",
  });
  const [Motoresprice, setMotoresprice] = useState(0);
  const [Motorespriceisset, setMotorespriceisset] = useState(false);
  const [Motoresigetting, setMotoresigetting] = useState(false);
  const selecttedMotoresskylight = async (e) => {
    const { name, id } = e.target;
    if (product.type[0] === "Colby Skylight") {
      setMotoresigetting(true);
      if (width && drop) {
        if (id === "SomfyBatteryoperated" || id === "SomfyMainpower") {
          await userRequest
            .get(
              `/Additionalcost/singlecost?width=${width}&drop=${drop}&addingType=${id}${Bandforprice}&blindType=${product.type[0]}`
            )
            .then((response) => {
              setMotoresprice(response.data.price);
              setMotoresigetting(false);
              setMotorespriceisset(true);
              setSelectMotores({
                MotoreHead: "Motor",
                Motorecode: id,
              });
            })
            .catch((error) => console.log(error.response.data));
        } else {
          setMotoresigetting(false);
          setMotorespriceisset(false);
          setMotoresprice(0);
          setSelectMotores({
            MotoreHead: "Motor",
            Motorecode: id,
          });
        }
      } else {
        setMotoresigetting(false);
        setMotorespriceisset(false);
        setMotoresprice(0);
        setSelectMotores({
          MotoreHead: "Motor",
          Motorecode: "no",
        });
        toast.error("empty field width/drop.");
      }
    } else if (product.type[0] === "Roman Skylight") {
      if (width && drop) {
        setSelectMotores({
          MotoreHead: name,
          Motorecode: id,
        });
      } else {
        setMotoresigetting(false);
        setMotorespriceisset(false);
        setMotoresprice(0);
        setSelectMotores({
          MotoreHead: "Motor",
          Motorecode: "no",
        });
        toast.error("empty field width/drop.");
      }
    }
  };
  const selecttedMotores = (e) => {
    const { name } = e.target;
    const value = e.target.value;
    setSelectMotores({
      MotoreHead: name,
      Motorecode: value,
    });
    if (value !== "no") {
      const selectedMotorPrice = ThisBlindTypeMOtore.find(
        (motore) => motore.MotorCode === value
      );
      if (
        product.type[0] === "Sierra" ||
        product.type[0] === "Vertical" ||
        product.type[0] === "Eton"
      ) {
        let additionaPrice1RMtr, widthmin, additionaPrice1RMtrWith2Dotpint;
        if (width > 1000) {
          widthmin = width - 1000;
          additionaPrice1RMtr = (widthmin * 53) / 1000;
          additionaPrice1RMtrWith2Dotpint = parseFloat(
            additionaPrice1RMtr.toFixed(2)
          );
        }
        setMotoresprice(
          selectedMotorPrice.AdditionPrice + additionaPrice1RMtrWith2Dotpint
        );
      } else {
        setMotoresprice(selectedMotorPrice.AdditionPrice);
      }
    } else {
      setMotoresprice(0);
    }
  };
  const [SelectRemote, setSelectRemote] = useState({
    RemoteHead: "Remote",
    Remotecode: "no",
  });
  const [Remoteprice, setRemoteprice] = useState(0);
  const selecttedRemote = (e) => {
    const { name } = e.target;
    const value = e.target.value;
    setSelectRemote({
      RemoteHead: name,
      Remotecode: value,
    });
    if (value !== "no") {
      const selectedpRemotePrice = ThisBlindTyperemotes.find(
        (motore) => motore.RemotesCode === value
      );
      setRemoteprice(selectedpRemotePrice.AdditionPrice);
    } else {
      setRemoteprice(0);
    }
  };
  const [SelectAccessories, setSelectAccessories] = useState({
    AccessoriesHead: "Accessories",
    Accessoriescode: "no",
  });
  const [Accessoriesprice, setAccessoriesprice] = useState(0);
  const selecttedAccessories = (e) => {
    const { name } = e.target;
    const value = e.target.value;
    setSelectAccessories({
      AccessoriesHead: name,
      Accessoriescode: value,
    });
    if (value !== "no") {
      const selectedpaccesseriesPrice = ThisBlindTypeAccessories.find(
        (accesseries) => accesseries.AccessoriesCode === value
      );
      setAccessoriesprice(selectedpaccesseriesPrice.AdditionPrice);
    } else {
      setAccessoriesprice(0);
    }
  };

  const Pricewithaddition =
    BliendPrice + Motoresprice + Remoteprice + Accessoriesprice;
  const dispatch = useDispatch();
  const min = 1;
  const max = 5000;
  const randomnumber =
    Math.floor(Math.random() * (max - min + 1)) + product._id;
  const handeladdcart = (e) => {
    e.preventDefault();
    if (width >= minWidthWithType && drop >= minDropWithType) {
      if (product.type[0] === "Roller") {
        dispatch(
          addProduct({
            ...product,
            Qtyvalue,
            Pricewithaddition,
            randomnumber,
            width,
            drop,
            Control,
            Fabric,
            Mount,
            Hanger,
            Metel,
            /* OneTouchUp,
            Headrail,
              PlainCassette,
            Cassette, */
            AddSystem,
            SelectMotores,
            SelectRemote,
            SelectAccessories,
          })
        );
      } else if (
        product.type[0] === "Vertical" ||
        product.type[0] === "Sierra"
      ) {
        dispatch(
          addProduct({
            ...product,
            Qtyvalue,
            Pricewithaddition,
            randomnumber,
            width,
            drop,
            Control,
            Fabric,
            Chain,
            Stacking,
            Mount,
            Hanger,
            Metel,
            SelectMotores,
            SelectRemote,
            SelectAccessories,
          })
        );
      } else if (product.type[0] === "Panel") {
        dispatch(
          addProduct({
            ...product,
            Qtyvalue,
            Pricewithaddition,
            randomnumber,
            width,
            drop,
            SelectTrack,
            Control,
            Fabric,
            Chain,
            Stacking,
            Mount,
            Hanger,
            Metel,
            SelectMotores,
            SelectRemote,
            SelectAccessories,
          })
        );
      } else if (product.type[0] === "Wooden") {
        dispatch(
          addProduct({
            ...product,
            Qtyvalue,
            Pricewithaddition,
            randomnumber,
            width,
            drop,
            Control,
            Fabric,
            Mount,
            Hanger,
            SelectMotores,
            SelectRemote,
            SelectAccessories,
          })
        );
      } else if (product.type[0] === "Patricia") {
        dispatch(
          addProduct({
            ...product,
            Qtyvalue,
            Pricewithaddition,
            randomnumber,
            width,
            drop,
            Control,
            Fabric,
            Mount,
            Hanger,
            Metel,
            SelectMotores,
            SelectRemote,
            SelectAccessories,
          })
        );
      } else if (
        product.type[0] === "Meliso" ||
        product.type[0] === "Luzon" ||
        product.type[0] === "Dorren" ||
        product.type[0] === "Grayson"
      ) {
        dispatch(
          addProduct({
            ...product,
            Qtyvalue,
            Pricewithaddition,
            randomnumber,
            width,
            drop,
            Control,
            Fabric,
            Mount,
            Hanger,
            Metel,
            Cassette,
            SelectMotores,
            SelectRemote,
            SelectAccessories,
          })
        );
      } else if (product.type[0] === "Colby") {
        dispatch(
          addProduct({
            ...product,
            Qtyvalue,
            Pricewithaddition,
            randomnumber,
            width,
            drop,
            pleat,
            Control,
            Fabric,
            Mount,
            Hanger,
            Metel,
            Clutch,
            BottomDown,
            DayNight,
            TopDownBottomUp,
            SelectMotores,
            SelectRemote,
            SelectAccessories,
          })
        );
      } else if (product.type[0] === "Aric") {
        dispatch(
          addProduct({
            ...product,
            Qtyvalue,
            Pricewithaddition,
            randomnumber,
            width,
            drop,
            Control,
            Fabric,
            Mount,
            Hanger,
          })
        );
      } else if (
        product.type[0] === "Roman Skylight" ||
        product.type[0] === "Colby Skylight"
      ) {
        dispatch(
          addProduct({
            ...product,
            Qtyvalue,
            Pricewithaddition,
            randomnumber,
            width,
            drop,
            Fabric,
            SelectMotores,
            SelectRemote,
          })
        );
      } else if (product.type[0] === "Roman") {
        dispatch(
          addProduct({
            ...product,
            Qtyvalue,
            Pricewithaddition,
            randomnumber,
            width,
            drop,
            Fabric,
            Control,
            Fabric,
            Mount,
            Hanger,
            Metel,
            OneTouchDown,
            LiningOption,
            SelectMotores,
            SelectRemote,
            SelectAccessories,
          })
        );
      }
      setShowOption(true);
    }
  };

  const srolllocation = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [srolllocation]);

  const hoverHandler = (image, i) => {
    setImg(image);
    refs.current[i].classList.add("active");
    for (var j = 0; j < images.length; j++) {
      if (i !== j) {
        refs.current[j].classList.remove("active");
      }
    }
  };
  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  function handleOptionClick(option) {
    setSelectedOption(option);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setSelectedOption(null);
    setModalOpen(false);
  }
  return (
    <>
      <Helmet>
        <title>{product.title ? product.title : "abc"} - blinds</title>
      </Helmet>
      <div className="product-detailes-page-wrapper">
        <Navbar />
        <section className="section-pagetop">
          <div className="container-fluid mainhedof-productlist">
            {IsLoaded ? (
              <Skeliton type="ProductNavigationBar" />
            ) : (
              <>
                <Link to="/" className="home-redirector">
                  Home
                </Link>{" "}
                &nbsp; / &nbsp;
                <Link className="home-redirector" to="/blindlist">
                  Blinds
                </Link>
                &nbsp; / &nbsp;
                <Link
                  className="home-redirector"
                  to={`/blindlist/${product.type[0]}`}
                >
                  {product.type[0]}
                </Link>
                &nbsp; / &nbsp;
                <span>{product.title}</span>
              </>
            )}
          </div>
        </section>
        <div className="main-product-detailes">
          <div className="image-container-box">
            {IsLoaded ? (
              <Skeliton type="ProductimagesBox" />
            ) : (
              <div className="left">
                <div className="All_image_product_box">
                  {images.map((image, i) => {
                    return (
                      <div
                        className={i == 0 ? "img_wrap active" : "img_wrap"}
                        key={"blindImage" + i}
                        onMouseOver={() => hoverHandler(image, i)}
                        ref={addRefs}
                      >
                        <img
                          src={`${baseUrlForMedia}images/febrickBlind/${image}`}
                          alt=""
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="main_larg_image_product">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "",
                        isFluidWidth: true,
                        src: `${baseUrlForMedia}images/febrickBlind/${img}`,
                        height: "100%",
                      },
                      largeImage: {
                        src: `${baseUrlForMedia}images/febrickBlind/${img}`,
                        width: 2500,
                        height: 2500,
                      },
                      enlargedImageContainerDimensions: {
                        width: "75%",
                        height: "100%",
                      },
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="masurment-detailes-box">
            <div className="massuement-details">
              {IsLoaded ? (
                <Skeliton type="ProductDescreaptionBox" />
              ) : (
                <>
                  <div className="main-heading-blind-prodcut">
                    <h2 className="m-0">{product.title}</h2>
                    <p className="m-0">
                      {product.type[0]} Blind / Band {Bandforprice}
                    </p>
                    <div className="d-flex">
                      <p className="m-0 secondary-note-codes">
                        {product.productCode
                          ? `Product Code : #${product.productCode} `
                          : ""}
                      </p>
                      &nbsp;&nbsp;&nbsp;
                      <p className="m-0 secondary-note-codes">
                        {product.manufactureCode
                          ? ` Manufacture Code : #${product.manufactureCode}`
                          : ""}
                      </p>
                    </div>
                  </div>
                  {/* <div className="price-wrap my-3">
                <span className="price-old">Start from &nbsp;</span>
                <span className="price">£12.80</span> &nbsp;
                <del className="price-old">£19.80</del>
              </div> */}
                  <div className="massurmensts-ofbriends">
                    <form onSubmit={handeladdcart}>
                      <div className="inner-massurmensts-ofbriends">
                        <h5 className="mb-3">
                          {product.type[0] === "Wooden"
                            ? "Slate Option"
                            : "Fabric Option"}
                        </h5>
                        <div className="d-flex flex-wrap  fabricbox-topdflex">
                          {IsLoadedfabric ? (
                            <Skeliton type="Fabricload" />
                          ) : (
                            Fabricget.map((items, index) => (
                              <div
                                className="Brackets-box mb-2"
                                key={"fabricList" + index}
                              >
                                <input
                                  type="radio"
                                  id={items["fabricName"]}
                                  name="Fabric"
                                  className={items["band"]}
                                  onChange={handalefabric}
                                  required
                                  value={items["uniquId"]}
                                  title={items["fabric"]}
                                  checked={
                                    Fabric.optionData === items["fabricName"]
                                  }
                                />
                                <label
                                  htmlFor="febric1"
                                  className="febricoption"
                                >
                                  <img
                                    src={`${baseUrlForMedia}images/fabrics/${items["fabImg"]}`}
                                    className="w-100"
                                    alt=""
                                  />
                                  <p>
                                    <span>{items["fabricName"]}</span>
                                  </p>
                                </label>
                              </div>
                            ))
                          )}
                        </div>
                        <h5 className="mb-3 mt-2">Enter Your Measurement</h5>
                        <div className="d-flex mobileshowupdown">
                          <div className="heading-enter-width">
                            <span>Enter your Width (In MM)</span>
                            <input
                              type="number"
                              onBlur={handleNumbers}
                              onChange={handleInputChange}
                              onWheel={(e) => e.target.blur()}
                              className="searchbox width"
                              name="width"
                              placeholder={`Min: ${minWidthWithType} | Max: ${maxWidthWithType}`}
                              style={{
                                borderColor: Lessminwidth
                                  ? "red"
                                  : "rgb(230, 230, 230)",
                              }}
                              required
                            />
                          </div>
                          <div className="heading-enter-Drop">
                            <span>Enter your Drop (In MM)</span>
                            <input
                              type="number"
                              className="searchbox Drop"
                              onBlur={handleNumbers}
                              onChange={handleInputChange}
                              onWheel={(e) => e.target.blur()}
                              name="Drop"
                              style={{
                                borderColor: Lessmindrop
                                  ? "red"
                                  : "rgb(230, 230, 230)",
                              }}
                              placeholder={`Min: ${minDropWithType} | Max: ${maxDropWithType}`}
                              required
                            />
                          </div>
                        </div>
                        {product.type[0] === "Colby" ? (
                          <>
                            <h5 className="mb-3 mt-2">Pleat Size</h5>
                            <div className="d-flex ">
                              <div className="Brackets-box">
                                <input
                                  type="radio"
                                  id="26mm"
                                  name="PleatSize"
                                  onChange={handalepleat}
                                  checked={pleat.optionData === "26mm"}
                                  required
                                />
                                <label htmlFor="26mm">26 mm</label>
                              </div>
                              <div className="Brackets-box">
                                <input
                                  type="radio"
                                  id="38mm"
                                  name="PleatSize"
                                  onChange={handalepleat}
                                  checked={pleat.optionData === "38mm"}
                                  required
                                />
                                <label htmlFor="38mm">38 mm</label>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {product.type[0] === "Panel" ? (
                          <>
                            <h5 className="mb-3 mt-2">Select Track</h5>
                            <div className="d-flex ">
                              <div className="Brackets-box">
                                <input
                                  type="radio"
                                  id="3WayTrack"
                                  name="SelectTrack"
                                  onChange={handaleSelectTrack}
                                  checked={
                                    SelectTrack.optionData === "3WayTrack"
                                  }
                                  required
                                />
                                <label htmlFor="3WayTrack">
                                  {ShowSelectTrack ? <Loader /> : "3 Way Track"}
                                </label>
                              </div>
                              <div className="Brackets-box">
                                <input
                                  type="radio"
                                  id="4WayTrack"
                                  name="SelectTrack"
                                  onChange={handaleSelectTrack}
                                  checked={
                                    SelectTrack.optionData === "4WayTrack"
                                  }
                                  required
                                />
                                <label htmlFor="4WayTrack">
                                  {ShowSelectTrack ? <Loader /> : "4 Way Track"}
                                </label>
                              </div>
                              <div className="Brackets-box">
                                <input
                                  type="radio"
                                  id="6WayTrack"
                                  name="SelectTrack"
                                  onChange={handaleSelectTrack}
                                  checked={
                                    SelectTrack.optionData === "6WayTrack"
                                  }
                                  required
                                />
                                <label htmlFor="6WayTrack">
                                  {ShowSelectTrack ? <Loader /> : "6 Way Track"}
                                </label>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        {product.type[0] === "Roman Skylight" ? (
                          <>
                            <h5 className="my-3">
                              <span>Motor</span>
                            </h5>
                            <div className="d-flex">
                              <div className="Brackets-box w-100">
                                <input
                                  type="radio"
                                  id="StanderdMotorised"
                                  name="Motor"
                                  onChange={selecttedMotoresskylight}
                                  checked={
                                    SelectMotores.Motorecode ===
                                    "StanderdMotorised"
                                  }
                                  required
                                />
                                <label htmlFor="StanderdMotorised">
                                  Standerd
                                </label>
                              </div>
                            </div>
                          </>
                        ) : product.type[0] === "Colby Skylight" ? (
                          <>
                            <h5 className="my-3">
                              <span>Motor</span>
                            </h5>

                            <div
                              className="Brackets-box w-100"
                              style={{ marginBottom: "10px" }}
                            >
                              <input
                                type="radio"
                                id="StanderdMotorised"
                                name="Motor"
                                onChange={selecttedMotoresskylight}
                                checked={
                                  SelectMotores.Motorecode ===
                                  "StanderdMotorised"
                                }
                                disabled={Motoresigetting}
                                required
                              />
                              <label htmlFor="StanderdMotorised">
                                {Motoresigetting ? <Loader /> : "Standerd"}
                              </label>
                            </div>
                            <div className="d-flex">
                              <div className="Brackets-box ">
                                <input
                                  type="radio"
                                  id="SomfyMainpower"
                                  name="Motor"
                                  onChange={selecttedMotoresskylight}
                                  checked={
                                    SelectMotores.Motorecode ===
                                    "SomfyMainpower"
                                  }
                                  disabled={Motoresigetting}
                                  required
                                />
                                <label htmlFor="SomfyMainpower">
                                  {Motoresigetting ? (
                                    <Loader />
                                  ) : (
                                    "Somfy Main power"
                                  )}
                                </label>
                              </div>
                              <div className="Brackets-box">
                                <input
                                  type="radio"
                                  id="SomfyBatteryoperated"
                                  name="Motor"
                                  onChange={selecttedMotoresskylight}
                                  checked={
                                    SelectMotores.Motorecode ===
                                    "SomfyBatteryoperated"
                                  }
                                  disabled={Motoresigetting}
                                  required
                                />
                                <label htmlFor="SomfyBatteryoperated">
                                  {Motoresigetting ? (
                                    <Loader />
                                  ) : (
                                    "Somfy Battery operated"
                                  )}
                                </label>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        {product.type[0] === "Roman Skylight" ||
                        product.type[0] === "Colby Skylight" ? (
                          <>
                            <h5 className="my-3">
                              <span>Remote</span>
                            </h5>
                            <select
                              id="RemoteOperatingSystem"
                              className="oprating-system-box"
                              name="Remote"
                              onChange={selecttedRemote}
                              required
                            >
                              <option value="no">Select Remotes</option>
                              {ThisBlindTyperemotes.map((remotes) => (
                                <option
                                  key={"remotesSkylight" + remotes._id}
                                  value={remotes.RemotesCode}
                                >
                                  {remotes.RemotesName}
                                </option>
                              ))}
                            </select>
                          </>
                        ) : (
                          ""
                        )}
                        {product.type[0] !== "Roman Skylight" &&
                        product.type[0] !== "Colby Skylight" ? (
                          <>
                            <div
                              className={`more-options ${
                                ShowOption ? "" : "show"
                              }`}
                            >
                              <h5 className="my-3">
                                <span>
                                  Control Option
                                  {product.type[0] === "Vertical" ||
                                  product.type[0] === "Sierra" ||
                                  product.type[0] === "Panel" ? (
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "#ccc",
                                      }}
                                    >
                                      &nbsp; ( Note: Option not available for
                                      wand control )
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </span>
                                <div
                                  className="info-button"
                                  onClick={() => handleOptionClick(Info[2])}
                                >
                                  <i
                                    className="fa fa-info-o"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </h5>
                              <div className="d-flex">
                                <div className="Brackets-box">
                                  <input
                                    type="radio"
                                    id="Left"
                                    name="Side"
                                    onChange={handaleControl}
                                    required
                                  />
                                  <label htmlFor="ceiling">Left Side</label>
                                </div>
                                <div className="Brackets-box">
                                  <input
                                    type="radio"
                                    id="Right"
                                    name="Side"
                                    onChange={handaleControl}
                                    required
                                  />
                                  <label htmlFor="wall">Right Side</label>
                                </div>
                              </div>

                              {product.type[0] === "Vertical" ||
                              product.type[0] === "Sierra" ||
                              product.type[0] === "Panel" ? (
                                <>
                                  <h5 className="my-3">
                                    <span>Chain Control</span>
                                    <div
                                      className="info-button"
                                      onClick={() => handleOptionClick(Info[4])}
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div className="d-flex">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="Cord"
                                        name="Chain"
                                        onChange={handaleChain}
                                        required
                                      />
                                      <label htmlFor="Plain">Cord Chain</label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="Ball"
                                        name="Chain"
                                        onChange={handaleChain}
                                        required
                                      />
                                      <label htmlFor="Ball">Ball Chain</label>
                                    </div>
                                  </div>
                                  <h5 className="my-3">
                                    <span>Opening Direction</span>
                                    <div
                                      className="info-button"
                                      onClick={() => handleOptionClick(Info[5])}
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div className="d-flex mobileshowupdown opartig">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="LeftSide"
                                        name="Stacking"
                                        onChange={handaleStacking}
                                        checked={
                                          Stacking.optionData === "LeftSide"
                                        }
                                        required
                                      />
                                      <label htmlFor="LeftSide">
                                        Left Side
                                      </label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="RightSide"
                                        name="Stacking"
                                        onChange={handaleStacking}
                                        checked={
                                          Stacking.optionData === "RightSide"
                                        }
                                        required
                                      />
                                      <label htmlFor="RightSide">
                                        Right Side
                                      </label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="CenterSplit"
                                        name="Stacking"
                                        onChange={handaleStacking}
                                        checked={
                                          Stacking.optionData === "CenterSplit"
                                        }
                                        required
                                      />
                                      <label htmlFor="CenterSplit">
                                        Center Split
                                      </label>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                              <h5 className="my-3">
                                <span>Mounting Bracket</span>
                                <div
                                  className="info-button"
                                  onClick={() => handleOptionClick(Info[6])}
                                >
                                  <i
                                    className="fa fa-info-o"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </h5>
                              <div className="d-flex">
                                <div className="Brackets-box">
                                  <input
                                    type="radio"
                                    id="WallMount"
                                    name="Mounting"
                                    onChange={handaleMount}
                                    required
                                  />
                                  <label htmlFor="WallMount">Wall Mount</label>
                                </div>
                                <div className="Brackets-box">
                                  <input
                                    type="radio"
                                    id="CeilingMount"
                                    name="Mounting"
                                    onChange={handaleMount}
                                    required
                                  />
                                  <label htmlFor="CeilingMount">
                                    Ceiling Mount
                                  </label>
                                </div>
                              </div>
                              <h5 className="my-3">
                                <span>
                                  Ball Chain Hanger
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "#ccc",
                                    }}
                                  >
                                    &nbsp; ( Note: For child safety )
                                  </span>
                                </span>
                                <div
                                  className="info-button"
                                  onClick={() => handleOptionClick(Info[7])}
                                >
                                  <i
                                    className="fa fa-info-o"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </h5>
                              <div className="d-flex">
                                <div className="Brackets-box">
                                  <input
                                    type="radio"
                                    id="YesHanger"
                                    name="BallChainHanger"
                                    onChange={handaleHanger}
                                    required
                                  />
                                  <label htmlFor="YesHanger">Yes</label>
                                </div>
                                <div className="Brackets-box">
                                  <input
                                    type="radio"
                                    id="NoHanger"
                                    name="BallChainHanger"
                                    onChange={handaleHanger}
                                    required
                                  />
                                  <label htmlFor="NoHanger">No</label>
                                </div>
                              </div>
                              {product.type[0] !== "Wooden" &&
                              product.type[0] !== "Aric" ? (
                                <>
                                  <h5 className="my-3">
                                    <span>
                                      Metel Ball Chain
                                      {product.type[0] === "Vertical" ||
                                      product.type[0] === "Sierra" ||
                                      product.type[0] === "Panel" ? (
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            color: "#ccc",
                                          }}
                                        >
                                          &nbsp; ( Note: For cord and ball chain
                                          control only )
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </span>
                                    <div
                                      className="info-button"
                                      onClick={() => handleOptionClick(Info[8])}
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div className="d-flex">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="YesMetel"
                                        name="MetelBallChain"
                                        onChange={handaleMetel}
                                        required
                                      />
                                      <label htmlFor="YesMetel">Yes</label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="NoMetel"
                                        name="MetelBallChain"
                                        onChange={handaleMetel}
                                        required
                                      />
                                      <label htmlFor="NoMetel">No</label>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                              {product.type[0] === "Roller" ? (
                                <>
                                  {/*  <h5 className="my-3">
                                    <span>
                                      One Touch Up System
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "#ccc",
                                        }}
                                      >
                                        &nbsp; ( Note: Only available with Head
                                        Rail option )
                                      </span>
                                    </span>
                                    <div
                                      className="info-button"
                                      onClick={() =>
                                        handleOptionClick(Info[19])
                                      }
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div className="d-flex">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="YesOneTouchUp"
                                        name="OneTouchUp"
                                        onChange={handaleOneTouchUp}
                                        checked={
                                          OneTouchUp.optionData ===
                                          "YesOneTouchUp"
                                        }
                                        required
                                      />
                                      <label htmlFor="YesOneTouchUp">Yes</label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="NoOneTouchUp"
                                        name="OneTouchUp"
                                        onChange={handaleOneTouchUp}
                                        checked={
                                          OneTouchUp.optionData ===
                                          "NoOneTouchUp"
                                        }
                                        required
                                      />
                                      <label htmlFor="NoOneTouchUp">No</label>
                                    </div>
                                  </div>
                                   <h5 className="my-3">
                                    <span>
                                      Headrail
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "#ccc",
                                        }}
                                      >
                                        &nbsp; ( Note: Comes With white colour
                                        only )
                                      </span>
                                    </span>
                                    <div
                                      className="info-button"
                                      onClick={() =>
                                        handleOptionClick(Info[18])
                                      }
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5> */}
                                  {/* <div className="d-flex">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="YesHeadrail"
                                        name="HeadRail"
                                        onChange={handaleHeadrail}
                                        checked={
                                          Headrail.optionData === "YesHeadrail"
                                        }
                                        required
                                      />
                                      <label htmlFor="YesHeadrail">
                                        {ShowHeadrail ? <Loader /> : "Yes"}
                                      </label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="NoHeadrail"
                                        name="HeadRail"
                                        onChange={handaleHeadrail}
                                        checked={
                                          Headrail.optionData === "NoHeadrail"
                                        }
                                        required
                                      />
                                      <label htmlFor="NoHeadrail">
                                        {ShowHeadrail ? <Loader /> : "No"}
                                      </label>
                                    </div>
                                  </div>  
                                  <h5 className="my-3">
                                    <span>
                                      Plain Cassette
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "#ccc",
                                        }}
                                      >
                                        &nbsp; ( Note: Comes With white colour
                                        only )
                                      </span>
                                    </span>
                                    <div
                                      className="info-button"
                                      onClick={() =>
                                        handleOptionClick(Info[17])
                                      }
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div className="d-flex">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="YesPlainCassette"
                                        name="plainCassette"
                                        onChange={handalePlainCassette}
                                        checked={
                                          PlainCassette.optionData ===
                                          "YesPlainCassette"
                                        }
                                        required
                                      />
                                      <label htmlFor="YesPlainCassette">
                                        {ShowplainCassette ? <Loader /> : "Yes"}
                                      </label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="NoPlainCassette"
                                        name="plainCassette"
                                        onChange={handalePlainCassette}
                                        checked={
                                          PlainCassette.optionData ===
                                          "NoPlainCassette"
                                        }
                                        required
                                      />
                                      <label htmlFor="NoPlainCassette">
                                        {ShowplainCassette ? <Loader /> : "No"}
                                      </label>
                                    </div>
                                  </div>*/}
                                  <h5 className="my-3">
                                    <span>Add On System</span>
                                    <div
                                      className="info-button"
                                      onClick={() =>
                                        handleOptionClick(Info[17])
                                      }
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div
                                    className="d-flex"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="DirectFix"
                                        name="AddSystem"
                                        onChange={handaleAddSystem}
                                        checked={
                                          AddSystem.optionData === "DirectFix"
                                        }
                                        required
                                      />
                                      <label htmlFor="DirectFix">
                                        Direct Fix
                                      </label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="OneTouchUp"
                                        name="AddSystem"
                                        onChange={handaleAddSystem}
                                        checked={
                                          AddSystem.optionData === "OneTouchUp"
                                        }
                                        required
                                      />
                                      <label htmlFor="OneTouchUp">
                                        One Touch Up
                                      </label>
                                    </div>
                                  </div>
                                  <div className="d-flex">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="PlainCassette"
                                        name="AddSystem"
                                        onChange={handaleAddSystem}
                                        checked={
                                          AddSystem.optionData ===
                                          "PlainCassette"
                                        }
                                        required
                                      />
                                      <label htmlFor="PlainCassette">
                                        {ShowplainCassette ? (
                                          <Loader />
                                        ) : (
                                          "Plain Cassette"
                                        )}
                                      </label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="DecorativeCassette"
                                        name="AddSystem"
                                        onChange={handaleAddSystem}
                                        checked={
                                          AddSystem.optionData ===
                                          "DecorativeCassette"
                                        }
                                        required
                                      />
                                      <label htmlFor="DecorativeCassette">
                                        {ShowDecoraruve ? (
                                          <Loader />
                                        ) : (
                                          "Decorative Cassette"
                                        )}
                                      </label>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                              {product.type[0] === "Meliso" ||
                              product.type[0] === "Luzon" ||
                              product.type[0] === "Dorren" ||
                              product.type[0] === "Grayson" ? (
                                <>
                                  <h5 className="my-3">
                                    <span>
                                      Decorative Cassette
                                      {product.type[0] === "Dorren" ||
                                      product.type[0] === "Grayson" ? (
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            color: "#ccc",
                                          }}
                                        >
                                          &nbsp; ( Note: Cassette is covered
                                          with selected fabric )
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </span>
                                    <div
                                      className="info-button"
                                      onClick={() =>
                                        handleOptionClick(Info[10])
                                      }
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div className="d-flex">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="YesDecoraruveCassette"
                                        name="Decoraruve"
                                        onChange={handaleCassette}
                                        checked={
                                          Cassette.optionData ===
                                          "YesDecoraruveCassette"
                                        }
                                        required
                                      />
                                      <label htmlFor="YesDecoraruveCassette">
                                        {ShowDecoraruve ? <Loader /> : "Yes"}
                                      </label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="NoDecoraruveCassette"
                                        name="Decoraruve"
                                        onChange={handaleCassette}
                                        checked={
                                          Cassette.optionData ===
                                          "NoDecoraruveCassette"
                                        }
                                        required
                                      />
                                      <label htmlFor="Cassette">
                                        {ShowDecoraruve ? <Loader /> : "No"}
                                      </label>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                              {product.type[0] === "Roman" ? (
                                <>
                                  <h5 className="my-3">
                                    <span>One Touch Down System</span>
                                    <div
                                      className="info-button"
                                      onClick={() =>
                                        handleOptionClick(Info[15])
                                      }
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div className="d-flex">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="YesOneTouchDown"
                                        name="OneTouchDownSystem"
                                        onChange={handaleOneTouchDown}
                                        checked={
                                          OneTouchDown.optionData ===
                                          "YesOneTouchDown"
                                        }
                                        required
                                      />
                                      <label htmlFor="YesOneTouchDown">
                                        Yes
                                      </label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="NoOneTouchDown"
                                        name="OneTouchDownSystem"
                                        onChange={handaleOneTouchDown}
                                        checked={
                                          OneTouchDown.optionData ===
                                          "NoOneTouchDown"
                                        }
                                        required
                                      />
                                      <label htmlFor="NoOneTouchDown">No</label>
                                    </div>
                                  </div>
                                  <h5 className="my-3">
                                    <span>Lining Option</span>
                                    <div
                                      className="info-button"
                                      onClick={() =>
                                        handleOptionClick(Info[16])
                                      }
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div className="d-flex">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="noLiningOption"
                                        name="BlackOutLining"
                                        onChange={handaleLiningOption}
                                        checked={
                                          LiningOption.optionData ===
                                          "noLiningOption"
                                        }
                                        required
                                      />
                                      <label htmlFor="noLiningOption">
                                        {ShowBlackOutLining ? <Loader /> : "No"}
                                      </label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="BlackOut"
                                        name="BlackOutLining"
                                        datatype="BlackOutLining"
                                        onChange={handaleLiningOption}
                                        checked={
                                          LiningOption.optionData === "BlackOut"
                                        }
                                        required
                                      />
                                      <label htmlFor="BlackOut">
                                        {ShowBlackOutLining ? (
                                          <Loader />
                                        ) : (
                                          "BlackOut"
                                        )}
                                      </label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="Translicent"
                                        name="BlackOutLining"
                                        datatype="TranslucentLining"
                                        onChange={handaleLiningOption}
                                        checked={
                                          LiningOption.optionData ===
                                          "Translicent"
                                        }
                                        required
                                      />
                                      <label htmlFor="Translicent">
                                        {ShowBlackOutLining ? (
                                          <Loader />
                                        ) : (
                                          "Translicent"
                                        )}
                                      </label>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                              {product.type[0] === "Colby" ? (
                                <>
                                  <h5 className="my-3">
                                    <span>
                                      Clutch Operating System
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "#ccc",
                                        }}
                                      >
                                        &nbsp; ( Note: Only with 38mm pleat size
                                        )
                                      </span>
                                    </span>
                                    <div
                                      className="info-button"
                                      onClick={() =>
                                        handleOptionClick(Info[11])
                                      }
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div className="d-flex">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="YesClutch"
                                        name="ClutchOperatingSystem"
                                        onChange={handaleClutch}
                                        checked={
                                          Clutch.optionData === "YesClutch"
                                        }
                                        required
                                      />
                                      <label htmlFor="YesClutch">Yes</label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="NoClutch"
                                        name="ClutchOperatingSystem"
                                        onChange={handaleClutch}
                                        checked={
                                          Clutch.optionData === "NoClutch"
                                        }
                                        required
                                      />
                                      <label htmlFor="NoClutch">No</label>
                                    </div>
                                  </div>

                                  <h5 className="my-3">
                                    <span>Day & Night</span>
                                    <div
                                      className="info-button"
                                      onClick={() =>
                                        handleOptionClick(Info[13])
                                      }
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div className="d-flex">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="noDayNight"
                                        name="DayNight"
                                        onChange={handaleDayNight}
                                        checked={
                                          DayNight.optionData === "noDayNight"
                                        }
                                        required
                                      />
                                      <label htmlFor="noDayNight">No</label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="Manual"
                                        name="DayNight"
                                        onChange={handaleDayNight}
                                        checked={
                                          DayNight.optionData === "Manual"
                                        }
                                        required
                                      />
                                      <label htmlFor="Manual">Manual</label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="Motorized"
                                        name="DayNight"
                                        onChange={handaleDayNight}
                                        checked={
                                          DayNight.optionData === "Motorized"
                                        }
                                        required
                                      />
                                      <label htmlFor="Motorized">
                                        Motorized
                                      </label>
                                    </div>
                                  </div>
                                  <h5 className="my-3">
                                    <span>Top Down Bottom Up System</span>
                                    <div
                                      className="info-button"
                                      onClick={() =>
                                        handleOptionClick(Info[14])
                                      }
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div className="d-flex">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="noTopDownBottomUp"
                                        name="TopDownBottomUp"
                                        onChange={handaleTopDownBottomUp}
                                        checked={
                                          TopDownBottomUp.optionData ===
                                          "noTopDownBottomUp"
                                        }
                                        required
                                      />
                                      <label htmlFor="noTopDownBottomUp">
                                        {ShowTopDownBottomUp ? (
                                          <Loader />
                                        ) : (
                                          "No"
                                        )}
                                      </label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="Manual"
                                        name="TopDownBottomUp"
                                        onChange={handaleTopDownBottomUp}
                                        checked={
                                          TopDownBottomUp.optionData ===
                                          "Manual"
                                        }
                                        required
                                      />
                                      <label htmlFor="Manual">
                                        {ShowTopDownBottomUp ? (
                                          <Loader />
                                        ) : (
                                          "Manual"
                                        )}
                                      </label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="Motorized"
                                        name="TopDownBottomUp"
                                        onChange={handaleTopDownBottomUp}
                                        checked={
                                          TopDownBottomUp.optionData ===
                                          "Motorized"
                                        }
                                        required
                                      />
                                      <label htmlFor="Motorized">
                                        {ShowTopDownBottomUp ? (
                                          <Loader />
                                        ) : (
                                          "Motorized"
                                        )}
                                      </label>
                                    </div>
                                  </div>
                                  <h5 className="my-3">
                                    <span>
                                      Motorised Bottom Down System
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "#ccc",
                                        }}
                                      >
                                        &nbsp; ( Note: Only with 38mm pleat size
                                        )
                                      </span>
                                    </span>
                                    <div
                                      className="info-button"
                                      onClick={() =>
                                        handleOptionClick(Info[12])
                                      }
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div className="d-flex pb-2">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="YesBottomDown"
                                        name="MotorisedBottomDownSystem"
                                        onChange={handaleBottomDown}
                                        checked={
                                          BottomDown.optionData ===
                                          "YesBottomDown"
                                        }
                                        required
                                      />
                                      <label htmlFor="YesBottomDown">Yes</label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="NoBottomDown"
                                        name="MotorisedBottomDownSystem"
                                        onChange={handaleBottomDown}
                                        checked={
                                          BottomDown.optionData ===
                                          "NoBottomDown"
                                        }
                                        required
                                      />
                                      <label htmlFor="NoBottomDown">No</label>
                                    </div>
                                  </div>
                                  <div>
                                    {(() => {
                                      if (
                                        colbymotoreIsset &&
                                        DayNight.optionData !== "Manual" &&
                                        TopDownBottomUp.optionData !== "Manual"
                                      ) {
                                        return (
                                          <>
                                            <hr />
                                            <select
                                              id="MotorisedOperatingSystem"
                                              className="oprating-system-box"
                                              name="Motor"
                                              onChange={selecttedMotores}
                                              required
                                            >
                                              <option value="no">
                                                Select Motors
                                              </option>
                                              {ThisBlindTypeMOtore.map(
                                                (motore) => (
                                                  <option
                                                    key={
                                                      "motorescolby" +
                                                      motore._id
                                                    }
                                                    value={motore.MotorCode}
                                                  >
                                                    {motore.MotorName}
                                                  </option>
                                                )
                                              )}
                                            </select>
                                            <select
                                              id="RemoteOperatingSystem"
                                              className="oprating-system-box"
                                              name="Remote"
                                              onChange={selecttedRemote}
                                              required
                                            >
                                              <option value="no">
                                                Select Remotes
                                              </option>
                                              {ThisBlindTyperemotes.map(
                                                (remotes) => (
                                                  <option
                                                    key={
                                                      "remotescolby" +
                                                      remotes._id
                                                    }
                                                    value={remotes.RemotesCode}
                                                  >
                                                    {remotes.RemotesName}
                                                  </option>
                                                )
                                              )}
                                            </select>
                                            <select
                                              id="AccessoriesOperatingSystem"
                                              className="oprating-system-box"
                                              name="Accessories"
                                              onChange={selecttedAccessories}
                                              required
                                            >
                                              <option value="no">
                                                Select Accessories
                                              </option>
                                              {ThisBlindTypeAccessories.map(
                                                (accessories) => (
                                                  <option
                                                    key={
                                                      "Accessoriescolby" +
                                                      accessories._id
                                                    }
                                                    value={
                                                      accessories.AccessoriesCode
                                                    }
                                                  >
                                                    {
                                                      accessories.AccessoriesName
                                                    }
                                                  </option>
                                                )
                                              )}
                                            </select>
                                          </>
                                        );
                                      }
                                    })()}
                                  </div>
                                </>
                              ) : (
                                ""
                              )}

                              {product.type[0] !== "Colby" &&
                              product.type[0] !== "Aric" ? (
                                <>
                                  <h5 className="my-3">
                                    <span>Operating system</span>
                                    <div
                                      className="info-button"
                                      onClick={() => handleOptionClick(Info[9])}
                                    >
                                      <i
                                        className="fa fa-info-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </h5>
                                  <div className="d-flex Operatingsystem">
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="Manual"
                                        name="Operating"
                                        onChange={handaleOperatingSystem}
                                        checked={
                                          OperatingSystem.OperatingSystemName ===
                                          null
                                        }
                                        required
                                      />
                                      <label htmlFor="Manual">Manual</label>
                                    </div>
                                    <div className="Brackets-box">
                                      <input
                                        type="radio"
                                        id="Motorised"
                                        name="Operating"
                                        onChange={handaleOperatingSystem}
                                        checked={
                                          OperatingSystem.OperatingSystemName ===
                                          "Motorised"
                                        }
                                        required
                                      />
                                      <label htmlFor="Motorised">
                                        Motorised
                                      </label>
                                    </div>
                                  </div>
                                  <div>
                                    {(() => {
                                      if (
                                        OperatingSystem.OperatingSystemName ===
                                        "Motorised"
                                      ) {
                                        return (
                                          <>
                                            <select
                                              id="MotorisedOperatingSystem"
                                              className="oprating-system-box"
                                              name="Motor"
                                              onChange={selecttedMotores}
                                              required
                                            >
                                              <option value="no">
                                                Select Motors
                                              </option>
                                              {ThisBlindTypeMOtore.map(
                                                (motore) => (
                                                  <option
                                                    key={
                                                      "motorereguler" +
                                                      motore._id
                                                    }
                                                    value={motore.MotorCode}
                                                  >
                                                    {motore.MotorName}
                                                  </option>
                                                )
                                              )}
                                            </select>
                                            <select
                                              id="RemoteOperatingSystem"
                                              className="oprating-system-box"
                                              name="Remote"
                                              onChange={selecttedRemote}
                                              required
                                            >
                                              <option value="no">
                                                Select Remotes
                                              </option>
                                              {ThisBlindTyperemotes.map(
                                                (remotes) => (
                                                  <option
                                                    key={
                                                      "remotesreguler" +
                                                      remotes._id
                                                    }
                                                    value={remotes.RemotesCode}
                                                  >
                                                    {remotes.RemotesName}
                                                  </option>
                                                )
                                              )}
                                            </select>
                                            {product.type[0] !== "Wooden" ? (
                                              <select
                                                id="AccessoriesOperatingSystem"
                                                className="oprating-system-box"
                                                name="Accessories"
                                                onChange={selecttedAccessories}
                                                required
                                              >
                                                <option value="no">
                                                  Select Accessories
                                                </option>
                                                {ThisBlindTypeAccessories.map(
                                                  (accessories) => (
                                                    <option
                                                      key={
                                                        "Accessoriesreguler" +
                                                        accessories._id
                                                      }
                                                      value={
                                                        accessories.AccessoriesCode
                                                      }
                                                    >
                                                      {
                                                        accessories.AccessoriesName
                                                      }
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                            ) : (
                                              ""
                                            )}
                                          </>
                                        );
                                      }
                                    })()}
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                            {ShowOption ? (
                              <p
                                className="text-center m-0 show-more"
                                onClick={togglemoreOption}
                              >
                                Show More Option
                              </p>
                            ) : (
                              <p
                                className="text-center m-0 show-more"
                                onClick={togglemoreOption}
                              >
                                Show Less Option
                              </p>
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="d-flex align-items-end mt-3">
                        <div className="price-delevary-option">
                          <p className="m-0">Estimated Delivery Date:</p>
                          <p className="delivarydate m-0">{delivarydate}</p>
                        </div>
                        <div className="price-delevary-option">
                          <p
                            className="m-0 pricehaed"
                            style={{ lineHeight: "1" }}
                          >
                            Your Price <br />{" "}
                            <span className="secondary-note">
                              (Before VAT)*
                            </span>
                          </p>
                          {IsLoadedPrice ? (
                            <Skeliton type="ProductPrice" />
                          ) : (
                            <div className="price-wrap ">
                              <del className="price-old">
                                £{(Pricewithaddition * Qtyvalue).toFixed(2)}
                              </del>{" "}
                              &nbsp;
                              <span className="price">
                                £{(Pricewithaddition * Qtyvalue).toFixed(2)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="add-tocart-btn">
                        <div className="d-flex align-items-center w-50">
                          <p className="m-0 qtyhead">Qty.</p>
                          <button
                            type="button"
                            onClick={Deincreasqty}
                            className="qty-plus-btns"
                          >
                            -
                          </button>
                          <input
                            type="type"
                            className="qty-number-box"
                            min="1"
                            value={Qtyvalue}
                          />
                          <button
                            type="button"
                            onClick={increasqty}
                            className="qty-minus-btns"
                          >
                            +
                          </button>
                        </div>
                        <div className="w-50">
                          {IsLoadedPrice ? (
                            <Skeliton type="Productaddtocart" />
                          ) : (
                            <button
                              className="add-btn"
                              onClick={() => setShowOption(false)}
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="other-detiles-blinds">
            <div
              className="main-quality"
              style={{
                paddingLeft: "0px",
                paddingRight: "0px",
                paddingTop: "2rem",
              }}
            >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4">
                    <div className="inner-quality-container">
                      <div className="inner-quality-box">
                        <h4>The Bespoke Fit</h4>
                        <p>
                          measure your window select your choice of window
                          blinds along with the fabric and mechanism and place
                          an order
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="inner-quality-container">
                      <div className="inner-quality-box">
                        <h4>48 hours Dispatch</h4>
                        <p>
                          once the order is placed within 48 hours it will be
                          shipped and delivered in 10 working days.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="inner-quality-container">
                      <div className="inner-quality-box">
                        <h4>Offering 5 Year Warranty</h4>
                        <p>
                          Order products comes with a 5 year warranty so sit
                          back and relax we got you covered!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <HowToMassure />
            <div className="free-samples">
              <h4>order your favorite basic sample</h4>
              <Link to="/contactus" type="button" className="sample-order-btn">
                Order Free Sample
              </Link>
            </div>
          </div>
        </div>
        <Footer />
        {selectedOption && (
          <Modal
            title={selectedOption.title}
            description1={selectedOption.description1}
            description2={selectedOption.description2}
            description3={selectedOption.description3}
            onClose={handleCloseModal}
          />
        )}
        {/*  {modalOpen && (
          <div className="overlay" onClick={handleCloseModal}></div>
        )} */}
      </div>
    </>
  );
}

export default Products;
