import React from 'react'

export default function Footer() {
  return (
    <div>
        <footer className="bg-dark text-white mt-5 p-4 text-center">
        {/* can add javascript functions right inline of the html */}
          Copyright &copy;{new Date().getFullYear()} DevConnector
        </footer>
    </div>
  )
}
