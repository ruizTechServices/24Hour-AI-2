import { Github, Twitter, Linkedin, Mail } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "API", href: "/api" },
    { name: "Documentation", href: "/docs" }
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" }
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
    { name: "Status", href: "/status" },
    { name: "Security", href: "/security" }
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" }
  ]
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/24hourai", label: "Twitter" },
  { icon: Github, href: "https://github.com/24hourai", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/company/24hourai", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@24hourai.com", label: "Email" }
]

export function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/[0.05]">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-violet-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                24Hour-AI
              </h3>
              <p className="text-slate-400 mt-2 leading-relaxed">
                Your 24/7 AI assistant for work, code, and study. Empowering professionals 
                with affordable access to premium AI models.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="group w-10 h-10 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4 capitalize">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="relative backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 mb-12">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] pointer-events-none"></div>
          
          <div className="relative z-10 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl font-semibold text-white mb-2">
                Stay Updated
              </h4>
              <p className="text-slate-400">
                Get the latest updates on new features and AI model releases.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 md:max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 transition-all duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.05]">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2024 24Hour-AI. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              All systems operational
            </span>
            <span>Made with ❤️ for professionals</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Save this component as: components/home/Footer.tsx
