import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInStart, signInFailure, signInSuccess } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import OAuth from "../Components/OAuth";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All the fields are required");
      return dispatch(signInFailure("All fields are required"));
    }
    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        toast.error(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      if (response.ok) {
        dispatch(signInSuccess(data));
        toast.success("Logged In!");
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* LEFT DIV */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Aathil&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This project is for the learning purpose, you can login to your own
            account here or use Google account to Login!
          </p>
        </div>
        {/* RIGHT DIV */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Signing In...</span>
                </>
              ) : (
                "SignIn"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont Have an Account</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
