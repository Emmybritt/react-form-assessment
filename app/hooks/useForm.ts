import { useState, useRef, useEffect } from "react";

export interface FormData {
  name?: string;
  email?: string;
  country: string;
  state: string;
  city: string;
  contact?: string;
  uniqueId?: string;
}

export const useForm = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [errors, setErrors] = useState<Partial<Omit<FormData, "uniqueId">>>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    import("../countriesstatescities.json").then((jsonData: any) =>
      setCountries(jsonData.default)
    );
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find((c) => c.name === selectedCountry);
      setStates(country?.states || []);
      setCities([]);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry, countries]);

  useEffect(() => {
    if (selectedState) {
      const state = states.find((s) => s.name === selectedState);
      setCities(state?.cities || []);
    } else {
      setCities([]);
    }
  }, [selectedState, states]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const name = nameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const contact = contactRef.current?.value.trim();

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!selectedCountry) errors.country = "Country is required";
    if (!selectedState) errors.state = "State is required";
    if (!selectedCity) errors.city = "City is required";
    if (!contact) errors.contact = "Contact is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  function generateUniqueID(length = 6) {
    return [...Array(length)]
      .map(() => Math.floor(Math.random() * 36).toString(36))
      .join("")
      .toUpperCase();
  }

  const handleSubmit = () => {
    if (validateForm()) {
      const randomId = generateUniqueID(6);
      setFormData({
        city: selectedCity,
        contact: contactRef?.current?.value,
        country: selectedCountry,
        email: emailRef?.current?.value,
        name: nameRef?.current?.value,
        state: selectedState,
        uniqueId: randomId,
      });
      setModalOpen(true);
    }
  };

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleClearForm = () => {
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);

    if (nameRef.current) nameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (contactRef.current) contactRef.current.value = "";

    setErrors({});
  };
  return {
    handleClearForm,
    handleSubmit,
    isModalOpen,
    formData,
    cities,
    errors,
    nameRef,
    emailRef,
    contactRef,
    selectedCountry,
    setSelectedCountry,
    countries,
    selectedState,
    states,
    selectedCity,
    setSelectedCity,
    setSelectedState,
    handleOk,
  };
};
