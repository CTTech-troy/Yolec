import React, { Component } from 'react';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import EventRegistrationForm from '../components/form/form.jsx';

export default class Home extends Component {
  render() {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <EventRegistrationForm />
        <Footer />
      </main>
    );
  }
}
