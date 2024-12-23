'use client'

import { useState } from 'react'
import { getCompatibleBloodGroups } from '../../utils/bloodGroupMatching'

export default function SearchDonors() {
  const [bloodGroup, setBloodGroup] = useState('')
  const [location, setLocation] = useState('')
  const [donors, setDonors] = useState([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const compatibleGroups = getCompatibleBloodGroups(bloodGroup as any)
    
    try {
      const response = await fetch(`/api/search-donors?bloodGroups=${compatibleGroups.join(',')}&location=${location}`)
      const data = await response.json()
      setDonors(data.donors)
    } catch (error) {
      console.error('Error searching donors:', error)
    }
  }

  return (
    <div className="min-h-screen bg-red-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Search Donors</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="mb-4">
          <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group</label>
          <select
            id="bloodGroup"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          />
        </div>
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Search
        </button>
      </form>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Available Donors</h2>
        {donors.length > 0 ? (
          <ul className="space-y-4">
            {donors.map((donor: any) => (
              <li key={donor.id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold">{donor.name}</h3>
                <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                <p><strong>Location:</strong> {donor.address}</p>
                <button className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Contact Donor
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No donors found matching your criteria.</p>
        )}
      </div>
    </div>
  )
}

