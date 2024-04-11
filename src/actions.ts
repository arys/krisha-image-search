'use server'

import axios from "axios"

export const searchApartments = async (prevState: any, formData: FormData) => {
  console.log({formData})
  const response = await axios.post("http://195.49.210.229:3005/image-search", formData)
  console.log(response.data)
  return response.data
}