import { useState } from "react";
import Card from "./components/Card";
function App() {
  const initialFormState = {
    name: "",
    description: "",
    githubURL: "",
    twitterURL: "",
    linkedinURL: "",
  };

  const [form, setForm] = useState({ ...initialFormState });
  const [error, setError] = useState({
    linkedinError: "",
    twitterError: "",
    githubError: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let hasError = false;

    if (
      form.githubURL !== "" &&
      !/https:\/\/github\.com\/.*/.test(form.githubURL)
    ) {
      setError((prev) => ({ ...prev, githubError: "Invalid github URL" }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, githubError: "" }));
    }

    if (
      form.twitterURL !== "" &&
      !/https:\/\/twitter\.com\/.*/.test(form.twitterURL)
    ) {
      setError((prev) => ({ ...prev, twitterError: "Invalid twitter URL" }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, twitterError: "" }));
    }

    if (
      form.linkedinURL !== "" &&
      !/https:\/\/linkedin\.com\/.*/.test(form.linkedinURL)
    ) {
      setError((prev) => ({ ...prev, linkedinError: "Invalid linkedin URL" }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, linkedinError: "" }));
    }

    if (!hasError) {
      setLoading(true);
      setTimeout(() => {
        setSubmittedData({ ...form });
        setSubmitted(true);
        setLoading(false);
        setForm({ ...initialFormState });
      }, 2000);
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gray-600 flex p-4 flex-wrap justify-around items-center">
        <form
          className="flex bg-white rounded h-full justify-center items-center flex-col gap-5 border border-gray-500 p-2 "
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={form.name}
            className="border border-gray-500 p-2"
            name="name"
            required
            placeholder="Enter Name"
            onChange={handleFormChange}
          />
          <textarea
            required
            value={form.description}
            className="border border-gray-500 p-2 h-20 min-h-20 max-h-20 w-full"
            type="text"
            name="description"
            placeholder="Write something about yourself."
            onChange={handleFormChange}
          />
          <input
            type="url"
            value={form.githubURL}
            className="border border-gray-500 p-2"
            name="githubURL"
            placeholder="Enter GitHub URL"
            onChange={handleFormChange}
          />
          {error.githubError && (
            <p className="text-xs text-red-600">{error.githubError}</p>
            )}
          <input
            type="url"
            value={form.twitterURL}
            className="border border-gray-500 p-2"
            name="twitterURL"
            placeholder="Enter Twitter URL"
            onChange={handleFormChange}
          />
          {error.twitterError && (
            <p className="text-xs text-red-600">{error.twitterError}</p>
            )}
          <input
            type="url"
            value={form.linkedinURL}
            className="border border-gray-500 p-2"
            name="linkedinURL"
            placeholder="Enter LinkedIn URL"
            onChange={handleFormChange}
          />
          {error.linkedinError && (
            <p className="text-xs text-red-600">{error.linkedinError}</p>
            )}

          <button
            type="submit"
            className="w-full rounded px-4 py-2 text-white bg-gray-900"
          >
            {!loading ? (
              "Create dev Card"
              ) : (
                <div className="flex justify-center items-center">
                <span>Creating dev card &nbsp;</span>
                <div className="w-4 h-4 border-2 border-white border-l-transparent animate-spin rounded-full"></div>
              </div>
            )}
          </button>
        </form>
        <div>{submitted && <Card {...submittedData} />}</div>
      </div>
    </>
  );
}

export default App;
