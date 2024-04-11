'use client'

import { searchApartments } from "@/actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { useState } from "react"
import { useFormState } from "react-dom"

export function SearchPage() {
  const [state, formAction] = useFormState(searchApartments, [])
  const [previewFile, setPreviewFile] = useState<string | null>(null)
  const buttonDisabled = !previewFile
  console.log(state)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-4">
        <form action={formAction}>
          <h1 className="text-2xl font-bold text-center mb-4">Search Apartments</h1>
          <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-md">
            <Input className="sr-only" id="image" name="image" type="file" onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                  setPreviewFile(e.target?.result as string)
                }
                reader.readAsDataURL(file)
              }
            }} />
            <Label className="cursor-pointer" htmlFor="image">
              <UploadIcon className="w-6 h-6 mx-auto mb-2" />
              <span>Upload an image</span>
            </Label>
          </div>
          {previewFile && <img alt="Preview" className="w-full h-48 rounded-lg mt-4" src={previewFile} />}
          {/* <div className="mt-4 flex items-center justify-center">
            <span className="mx-2">or</span>
          </div>
          <div className="mt-4">
            <Select name="style">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select apartment style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="old">Old</SelectItem>
                <SelectItem value="cozy">Cozy</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          <button
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ${
              buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={buttonDisabled}
          >
            Search
          </button>
        </form>
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-8">
        {state.filter((apt: any) => {
          // filter with same id
          return state.findIndex((apt2: any) => apt2.external_id === apt.external_id) === state.indexOf(apt)
        }).map((apartment: any) => (
          <a href={`http://krisha.kz/a/show/${apartment.external_id}`} target="_blank" rel="noreferrer" key={apartment.external_id}>
          <div className="bg-white rounded-lg shadow-md dark:bg-gray-800">
            <img
              alt={apartment.title}
              className="object-cover w-full h-48 rounded-t-lg"
              height={300}
              src={`http://195.49.210.229:3005/images/${apartment.external_id}.jpg`}
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
              width={400}
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{apartment.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{apartment.address}</p>
              <h4 className="font-semibold text-lg mt-2">
                {Intl.NumberFormat("en-US", { style: "currency", currency: "KZT" }).format(apartment.price)}/month
              </h4>
            </div>
          </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
