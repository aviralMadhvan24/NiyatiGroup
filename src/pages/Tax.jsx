import React from 'react';
import {
  FileText,
  Calculator,
  Building,
  Users,
  Star,
  TrendingUp,
  Shield,
  Briefcase,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-2xl border border-red-800 bg-[#7e2a2a] text-white shadow-lg', className)}
    {...props}
  />
));
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-2 p-6', className)} {...props} />
));
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-xl font-semibold text-white', className)} {...props} />
));
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-gray-400', className)} {...props} />
));
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';

const Tax = () => {
  const navigate = useNavigate();

  const financialServices = [
    {
      icon: FileText,
      title: 'Income Tax Services',
      description: 'Complete tax return preparation and audit services',
      features: ['Individual Tax Returns', 'Tax Planning', 'Tax Audit', 'TDS Returns']
    },
    {
      icon: Calculator,
      title: 'GST Services',
      description: 'Comprehensive GST solutions for your business',
      features: ['GST Registration', 'Monthly Returns', 'GST Audit', 'Input Tax Credit']
    },
    {
      icon: Building,
      title: 'Company Registration',
      description: 'Business incorporation and legal entity formation',
      features: ['Private Limited Company', 'LLP Registration', 'Partnership Firm', 'Sole Proprietorship']
    },
    {
      icon: Users,
      title: 'Compliance Services',
      description: 'Statutory compliance and regulatory services',
      features: ['PF Registration', 'ESI Registration', 'Labour License', 'Professional Tax']
    },
    {
      icon: Star,
      title: 'Intellectual Property',
      description: 'Protect your brand and innovations',
      features: ['Trademark Registration', 'Copyright', 'Patent Filing', 'Brand Protection']
    },
    {
      icon: Shield,
      title: 'Certifications',
      description: 'Quality and management system certifications',
      features: ['ISO Certification', 'FSSAI License', 'Drug License', 'BIS Certification']
    },
    {
      icon: Briefcase,
      title: 'Business Licenses',
      description: 'Import/export and trade licenses',
      features: ['Import Export Code', 'MSME Registration', 'Startup India', 'Digital Signature']
    },
    {
      icon: TrendingUp,
      title: 'Investment & Insurance',
      description: 'Wealth management and protection solutions',
      features: ['Mutual Funds', 'SIP Planning', 'Life Insurance', 'Health Insurance']
    }
  ];

  return (
    <section id="services" className="bg-red-950 py-24 md:py-32">
      <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-primary">Professional</span> Services
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We offer comprehensive financial and legal services tailored to meet your individual and business needs — all under one roof.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {financialServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <button
            onClick={() => navigate("/contact")}
            className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-primary/90 transition"
          >
            Get Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Tax;
