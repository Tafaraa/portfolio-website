import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Github, Linkedin, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await emailjs.sendForm(
        'service_spphf7e', 
        'template_98ura1p',
        form.current!,
        'cA3tWqrDKXpZSpT7s' 
      );

      if (result.text === 'OK') {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error:', error);
    }
  };

  const phoneNumber = '+27606249151';
  const whatsappMessage = encodeURIComponent('Hi Tafara, I found your portfolio website and would like to connect!');
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-20 md:py-32">
      <Toaster position="top-right" />
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter">CONTACT</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2 flex items-center gap-2">
                  <Mail size={20} />
                  Email
                </h3>
                <a 
                  href="mailto:mutsvedu.work@gmail.com" 
                  className="text-stone-600 hover:text-stone-900 transition-colors"
                >
                  mutsvedu.work@gmail.com
                </a>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2 flex items-center gap-2">
                  <Phone size={20} />
                  Phone
                </h3>
                <div className="flex items-center gap-4">
                  <a 
                    href="tel:+27606249151" 
                    className="text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    +27 60 624 9151
                  </a>
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 transition-colors"
                  >
                    <MessageCircle size={20} />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2 flex items-center gap-2">
                  <MapPin size={20} />
                  Location
                </h3>
                <p className="text-stone-600">
                  Midrand, South Africa
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Connect</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/Tafaraa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-stone-900 transition-colors"
                    title="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/tafara-mutsvedu-93825621b" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-stone-900 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <form ref={form} onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-xl font-medium mb-2">
                  Your Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xl font-medium mb-2">
                  Your Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xl font-medium mb-2">
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-4 bg-transparent border-b-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="inline-block border border-stone-900 px-8 py-4 text-stone-900 hover:bg-stone-900 hover:text-stone-100 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;