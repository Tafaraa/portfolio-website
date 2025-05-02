import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Github, Linkedin, MessageCircle, Check, AlertCircle, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import FormInput from './FormInput';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    email: '',
    message: ''
  });
  
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formValid, setFormValid] = useState(false);
  
  // Validate form whenever formData changes
  useEffect(() => {
    const isValid = 
      formData.from_name.trim().length > 0 && 
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.message.trim().length > 10;
    
    setFormValid(isValid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formValid) {
      toast.error('Please fix the errors in the form before submitting.');
      return;
    }
    
    setFormState('submitting');
    
    try {
      // Add a small delay to prevent rate limiting and show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Initialize EmailJS with your user ID
      emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID || '');
      
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current!,
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      if (result.text === 'OK') {
        setFormState('success');
        toast.success('Message sent successfully!');
        setFormData({
          from_name: '',
          email: '',
          message: ''
        });
        
        // Reset form state after 3 seconds
        setTimeout(() => {
          setFormState('idle');
        }, 3000);
      }
    } catch (error) {
      setFormState('error');
      toast.error('Failed to send message. Please try again.');
      console.error('Error:', error);
      
      // Reset form state after 3 seconds
      setTimeout(() => {
        setFormState('idle');
      }, 3000);
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
                  <Mail size={20} aria-hidden="true" />
                  Email
                </h3>
                <a 
                  href="mailto:mutsvedu.work@gmail.com" 
                  className="text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Email me at mutsvedu.work@gmail.com"
                >
                  mutsvedu.work@gmail.com
                </a>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2 flex items-center gap-2">
                  <Phone size={20} aria-hidden="true" />
                  Phone
                </h3>
                <div className="flex items-center gap-4">
                  <a 
                    href="tel:+27606249151" 
                    className="text-stone-600 hover:text-stone-900 transition-colors"
                    aria-label="Call me at +27 60 624 9151"
                  >
                    +27 60 624 9151
                  </a>
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 transition-colors"
                    aria-label="Contact me on WhatsApp"
                  >
                    <MessageCircle size={20} aria-hidden="true" />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2 flex items-center gap-2">
                  <MapPin size={20} aria-hidden="true" />
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
                    aria-label="Visit my GitHub profile"
                  >
                    <Github size={20} aria-hidden="true" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/tafara-mutsvedu-93825621b" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-stone-900 transition-colors"
                    title="LinkedIn"
                    aria-label="Visit my LinkedIn profile"
                  >
                    <Linkedin size={20} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <form ref={form} onSubmit={handleSubmit} className="space-y-12 relative">
              <div className="space-y-8">
                <FormInput
                  id="from_name"
                  name="from_name"
                  type="text"
                  label="Your Name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  minLength={2}
                  errorMessage="Please enter your name"
                />
                
                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  label="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  errorMessage="Please enter a valid email address"
                />
                
                <FormInput
                  id="message"
                  name="message"
                  type="textarea"
                  label="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  rows={5}
                  errorMessage="Message must be at least 10 characters"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <button 
                  type="submit"
                  disabled={!formValid || formState === 'submitting'}
                  className={`relative inline-flex items-center justify-center border px-8 py-4 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-dark-accent ${formValid ? 'border-stone-900 dark:border-dark-text text-stone-900 dark:text-dark-text hover:bg-stone-900 dark:hover:bg-dark-border hover:text-stone-100 dark:hover:text-dark-text' : 'border-stone-400 dark:border-dark-border text-stone-400 dark:text-dark-muted cursor-not-allowed'}`}
                  aria-label="Send your message"
                >
                  {formState === 'submitting' ? (
                    <>
                      <Loader size={18} className="mr-2 animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : formState === 'success' ? (
                    <>
                      <Check size={18} className="mr-2 text-green-500" aria-hidden="true" />
                      Sent Successfully
                    </>
                  ) : formState === 'error' ? (
                    <>
                      <AlertCircle size={18} className="mr-2 text-red-500" aria-hidden="true" />
                      Failed to Send
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
                
                {/* Form validation status */}
                {formValid && formState === 'idle' && (
                  <span className="text-green-600 dark:text-green-400 text-sm flex items-center">
                    <Check size={16} className="mr-1" aria-hidden="true" />
                    Ready to submit
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
