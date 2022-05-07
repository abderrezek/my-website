import React, { useState } from "react";
import Head from "next/head";

const showError = (err) =>
  err !== "" && (
    <p className="mt-1 text-sm text-red-600 dark:text-red-500">{err}</p>
  );

const classError = (err) =>
  err !== ""
    ? "bg-red-50 border border-red-400 text-red-900 placeholder-red-700 text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
    : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const isEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [typeResponse, setTypeResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // name
    if (name === "") {
      setErrors((prevState) => ({ ...prevState, name: "Nom est vide" }));
    } else if (name !== "") {
      setErrors((prevState) => ({ ...prevState, name: "" }));
    }
    // email
    if (email === "") {
      setErrors((prevState) => ({ ...prevState, email: "E-mail est vide" }));
    } else if (email !== "" && !isEmail(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "E-mail n'est pas valide",
      }));
    } else if (email !== "" && isEmail(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "",
      }));
    }
    // sujet
    if (sujet === "") {
      setErrors((prevState) => ({ ...prevState, sujet: "Sujet est vide" }));
    } else if (sujet !== "") {
      setErrors((prevState) => ({ ...prevState, sujet: "" }));
    }
    // message
    if (message === "") {
      setErrors((prevState) => ({ ...prevState, message: "Message est vide" }));
    } else if (message !== "") {
      setErrors((prevState) => ({ ...prevState, message: "" }));
    }
    if (
      name === "" ||
      email === "" ||
      (email !== "" && !isEmail(email)) ||
      sujet === "" ||
      message === ""
    ) {
      setLoading(false);
      return;
    }
    const data = `name=${name}&email=${email}&sujet=${sujet}&message=${message}`;
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://script.google.com/macros/s/AKfycbwN9HnSq76GkUmoBE9wnH-Xin1cFsV9W6QXOlc3/exec"
    );
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        setName("");
        setEmail("");
        setSujet("");
        setMessage("");
        setTypeResponse("success");
      }
    };
    xhr.onerror = function (e) {
      setTypeResponse("error");
    };
    xhr.onloadend = function (e) {
      setLoading(false);
    };
    xhr.send(data);
  };

  return (
    <>
      <Head>
        <title>Contactez moi</title>
      </Head>

      <h2 className="header">Contactez moi</h2>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-4/6">
          <div className="md:pr-8">
            {/* success message */}
            {typeResponse === "success" && (
              <div
                className="bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
                role="alert"
              >
                <span className="font-medium">Alerte réussite !</span> Merci de
                m{"'"}avoir envoyé un message, je vous répondrai bientôt!
              </div>
            )}
            {/* errors message */}
            {typeResponse === "error" && (
              <div
                className="bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                <span className="font-medium">Alerte erreur !</span> Quelque
                chose s{"'"}est mal passé, veuillez rappeler rapidement
              </div>
            )}
            {/* form */}
            {typeResponse === "" && (
              <form
                className="space-y-2 mb-6 md:mb-0 gform"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                  <div className="w-full md:w-1/2">
                    <input
                      name="name"
                      type="text"
                      className={classError(errors["name"])}
                      placeholder="Votre Nom"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {showError(errors["name"])}
                  </div>

                  <div className="w-full md:w-1/2">
                    <input
                      name="email"
                      type="email"
                      className={classError(errors["email"])}
                      placeholder="Votre E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {showError(errors["email"])}
                  </div>
                </div>

                <input
                  name="sujet"
                  type="text"
                  className={classError(errors["sujet"])}
                  placeholder="Votre Sujet"
                  value={sujet}
                  onChange={(e) => setSujet(e.target.value)}
                />
                {showError(errors["sujet"])}

                <textarea
                  name="message"
                  rows="4"
                  className={classError(errors["message"])}
                  placeholder="Votre Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                {showError(errors["message"])}

                <button
                  className="btn flex items-center justify-center"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        role="status"
                        className="inline mr-2 w-4 h-4 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Chargement...
                    </>
                  ) : (
                    "ENVOIE"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/6 space-y-2">
          <p className="font-bold">Adresse</p>
          <p>Algérien, Algérie</p>
          <p className="font-bold">Téléphone</p>
          <p>0560314280 / 0697970724</p>
          <p className="font-bold">E-mail</p>
          <p>abderrezek.gallal@gmail.com</p>
          <p className="font-bold">Réseau Social</p>
          <p className="space-x-3">
            <a
              href="https://www.facebook.com/Abderrezek.G"
              className="inline-block"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="text-blue-600 h-6 w-6"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a>

            <a
              href="https://twitter.com/abderrezek94"
              className="inline-block"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="text-blue-600 h-6 w-6"
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/abderrezek-gallal"
              className="inline-block"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="text-blue-600 h-6 w-6"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </a>

            <a
              href="https://github.com/Abderrezek"
              className="inline-block"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="h-6 w-6"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;
