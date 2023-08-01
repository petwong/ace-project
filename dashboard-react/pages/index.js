import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import TableView from "./components/tableview/tableview";
import Filter from "./components/filter/filter";
import axios from "axios";
import { logout } from "@/store/loginSlice";

export default function Index() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login.user)

  useEffect(() => {
    if (user == null) {
      router.push('/login')
    }

    axios.get('http://localhost:3001/api/v1/smartphones').then(res => {
      setSmartphones(res.data.smartphones);
    }).catch(err => {
      alert(err.message)
    })
  }, [user])

  const [smartphones, setSmartphones] = useState([])

  const applyFilter = () => {
    const filter = document.querySelectorAll('.filter.active')[0];

    if (filter) {
      axios.post('http://localhost:3001/api/v1/smartphones/filters', {
        filters: [
          { filter: filter.dataset.searchAttribute }
        ]
      }).then(res => {
        setSmartphones(res.data.smartphones);
      }).catch(err => {
        alert(err.message)
      })
    }
  }

  const doLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="flex h-screen">
        <div className="w-64 border-2 flex-shrink-0">
          <div className="p-4">
            <h1 className="text-xl font-bold">Filter</h1>
          </div>
          <ul className="p-2">
            <Filter name="Apple" attribute="Apple" />
            <Filter name="Samsung" attribute="Samsung" />
            <Filter name="Google" attribute="Google" />
          </ul>
          <div className="flex flex-row-reverse p-4">
            <button onClick={applyFilter} className="rounded px-4 py-2 font-semibold text-white bg-purple-700 hover:bg-purple-600">Apply</button>
          </div>
        </div>
        <div className="flex-1 border-r-2">
          <div className="flex flex-row-reverse p-4">
            <div>
              <p>Welcome, {user}</p>
              <div>
                <button onClick={doLogout}>Logout</button>
              </div>
            </div>
          </div>
          <div className="flex border-t-2 p-4">
            <TableView data={smartphones} />
          </div>
        </div>
      </div>
    </main>
  )
}
