import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

import App from '../App'
import AboutUs from '../components/AboutUs/AboutUs'
import Header from '../components/Header/Header'
import Books from '../components/Books/Books'
import Authors from '../components/Authors/Authors'
import Publishers from '../components/Publishers/Publishers'




describe("Render Basic Components", () => {
    // Test 1
    test ('App renders without crashing', ()=> {
        <BrowserRouter>
            render(<App />);
            expect(screen.getByText('testParagraph')).toBeInTheDocument();
        </BrowserRouter>
    });

    // Test 2
    test('About Us renders without crashing', () => {
        <BrowserRouter>
            render(<AboutUs />);
            expect(screen.getByText('Gregory Raper')).toBeInTheDocument();
        </BrowserRouter>
    });

    // Test 3
    test('About Us renders fully without crashing', () => {
        <BrowserRouter>
            render(<AboutUs />);
            expect(screen.getByText('Used to build our web app')).toBeInTheDocument();
        </BrowserRouter>
    });

    // Test 4
    test('NavBar renders without crashing', () => {
        <BrowserRouter>
            render(<Header />);
            expect(screen.getByText('About Us')).toBeInTheDocument();
        </BrowserRouter>
    });

    // Test 5
    test('NavBar renders fully without crashing', () => {
        <BrowserRouter>
            render(<Header />);
            expect(screen.getByText('Publishers')).toBeInTheDocument();
        </BrowserRouter>
    });

    // Test 6
    test('Books page renders without crashing', () => {
        <BrowserRouter>
            render(<Books dataLen={10} />);
            expect(screen.getByText('Displaying')).toBeInTheDocument();
        </BrowserRouter>
    });

    // // Test 7
    test('Books page renders fully without crashing', () => {
        <BrowserRouter>
            render(<Books dataLen={10}/>);
            expect(screen.getByText('B')).toBeInTheDocument();
        </BrowserRouter>
    });

    // // Test 8
    test('Authors page renders fully without crashing', () => {
        <BrowserRouter>
            render(<Authors dataLen={10}/>);
            expect(screen.getByText('A')).toBeInTheDocument();
        </BrowserRouter>
    });

    // // Test 9
    test('Authors page fully renders without crashing', () => {
        <BrowserRouter>
            render(<Authors dataLen={10}/>);
            expect(screen.getByText('u')).toBeInTheDocument();
        </BrowserRouter>
    });

    // Test 10
    test('Publisher page renders without crashing', () => {
        <BrowserRouter>
            render(<Publishers dataLen={10}/>);
            expect(screen.getByText('P')).toBeInTheDocument();
        </BrowserRouter>
    });

    //Test 11
    test('Authors page renders Search without crashing', () => {
        <BrowserRouter>
            render(<Authors dataLen={10}/>);
            expect(screen.getByText('Search')).toBeInTheDocument();
        </BrowserRouter>
    });

    //Test 12
    test('Books page renders Search without crashing', () => {
        <BrowserRouter>
            render(<Books dataLen={10}/>);
            expect(screen.getByText('Search')).toBeInTheDocument();
        </BrowserRouter>
    });

    //Test 13
    test('Publishers page renders Search without crashing', () => {
        <BrowserRouter>
            render(<Publishers dataLen={10}/>);
            expect(screen.getByText('Search')).toBeInTheDocument();
        </BrowserRouter>
    });
});
