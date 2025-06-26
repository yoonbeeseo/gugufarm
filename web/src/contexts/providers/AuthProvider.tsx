"use client"

import { useQuery } from "@tanstack/react-query"
import { PropsWithChildren, useEffect, useState } from "react"
import { v4 } from "uuid"
import { Auth } from "../hooks"

export default function AuthProvider({ children }: PropsWithChildren) {
  const [uid, setUid] = useState<null | string>(null)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("uid")
      if (data) {
        const uid = JSON.parse(data)
        setUid(uid)
      } else {
        const uid = v4()
        localStorage.setItem("uid", JSON.stringify(uid))
        setUid(uid)
      }
    }
  }, [])

  const { data: profile, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      console.log("fetch with", uid)
      const res = await fetch(`http://localhost:4000/profile/${uid}`)
      const data = await res.json()
      console.log(data)

      return data
    },
    enabled: !!uid,
  })
  const [init, setInit] = useState(false)

  return <Auth value={{ profile, isPending, init, uid }}>{children}</Auth>
}
