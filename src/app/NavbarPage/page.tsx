"use client";

import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { app } from "../../lib/firebase"; 

export default function NavbarPage() {
    const [scrolled, setScrolled] = useState(false);

    return (
        <div>
            <Navbar setScrolled={setScrolled} />
        </div>
    );
}
