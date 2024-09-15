"use client";
import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "./hooks/useForm";

export default function Home() {
  const {
    isModalOpen,
    formData,
    errors,
    emailRef,
    contactRef,
    nameRef,
    countries,
    selectedCountry,
    handleClearForm,
    handleSubmit,
    setSelectedCountry,
    states,
    selectedState,
    setSelectedCity,
    cities,
    selectedCity,
    setSelectedState,
    handleOk,
  } = useForm();
  return (
    <div className="flex justify-center h-screen">
      <CustomModal
        isOpen={isModalOpen}
        formData={formData}
        handleOk={handleOk}
      />
      <Card className="w-[550px] mx-auto my-auto">
        <CardHeader>
          <CardTitle>Registration Form</CardTitle>
          <CardDescription>
            Please fill in the form to complete your registration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  ref={nameRef}
                  placeholder="Enter your name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm -mt-2">{errors.name}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  ref={emailRef}
                  placeholder="Enter your email address"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm -mt-2">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={selectedCountry}
                  onValueChange={(e) => setSelectedCountry(e)}
                  aria-invalid={!!errors.country}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-white">
                    {countries.map((country) => (
                      <SelectItem value={country.name} key={country.id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-red-500 text-sm -mt-2">{errors.country}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="state">State</Label>
                <Select
                  value={selectedState}
                  onValueChange={(e) => setSelectedState(e)}
                  disabled={!states.length}
                  aria-invalid={!!errors.state}
                >
                  <SelectTrigger id="state">
                    <SelectValue
                      placeholder={
                        states.length
                          ? "Select State"
                          : "Select a Country First"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-white">
                    {states.map((state) => (
                      <SelectItem value={state.name} key={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-red-500 text-sm -mt-2">{errors.state}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Select
                  value={selectedCity}
                  onValueChange={(e) => setSelectedCity(e)}
                  disabled={!cities.length}
                  aria-invalid={!!errors.city}
                >
                  <SelectTrigger id="city">
                    <SelectValue
                      placeholder={
                        cities.length ? "Select City" : "Select a State First"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-white">
                    {cities.map((city) => (
                      <SelectItem value={city.name} key={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && (
                  <p className="text-red-500 text-sm -mt-2">{errors.city}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  ref={contactRef}
                  placeholder="Enter your contact number"
                  aria-invalid={!!errors.contact}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm -mt-2">{errors.contact}</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClearForm}>
            Clear Form
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
