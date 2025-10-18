'use client';
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';

export default function NavbarPage() {
    const [scrolled, setScrolled] = useState(false);

    return (
        <div>
            <Navbar setScrolled={setScrolled} />
        </div>
    );
}
