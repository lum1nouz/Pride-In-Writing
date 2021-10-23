import React from 'react';
import AboutUs from '../components/AboutUs/AboutUs';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';


test('Checks that the About Us page renders without crashing', async () => {
    render(<BrowserRouter> <AboutUs /> </BrowserRouter>);
    const pamela = screen.getByTestId("pamela")
    const shyam = screen.getByTestId("shyam")
    const cliff = screen.getByTestId("cliff")
    const gregory = screen.getByTestId("gregory")
    const rodrigo = screen.getByTestId("rodrigo")
    expect(pamela).toBeInTheDocument();
    expect(shyam).toBeInTheDocument();
    expect(cliff).toBeInTheDocument();
    expect(gregory).toBeInTheDocument();
    expect(rodrigo).toBeInTheDocument();
})