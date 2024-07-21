import { toast, Slide} from "react-toastify";

const Toast = (type, msg) => {
  const options = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    className: "toast-message",
    rtl: true,
    theme: "colored",
    transition: Slide
  };
  switch (type) {
    case "success":
      return toast.success(msg, options);
    case "error":
      return toast.error(msg, options);
  }
};

export default Toast;
