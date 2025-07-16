// COMPLETE REWRITE OF MAIN.JS - This will fix all tab functionality across the entire website

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing...');
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // FIXED TAB FUNCTIONALITY - Works across all pages
    function initializeAllTabs() {
        console.log('🎯 Initializing tab system...');
        
        // Find ALL tab buttons on the page
        const allTabButtons = document.querySelectorAll('.tab-button');
        console.log(`Found ${allTabButtons.length} tab buttons`);
        
        // Add click event to each tab button
        allTabButtons.forEach((button, index) => {
            const tabId = button.getAttribute('data-tab');
            console.log(`Button ${index + 1}: ${tabId}`);
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log(`🔄 Tab clicked: ${tabId}`);
                
                // Find the parent tab group
                const tabGroup = button.closest('.example-tabs');
                if (!tabGroup) {
                    console.error('❌ No parent tab group found for button:', tabId);
                    return;
                }
                
                // Find all buttons and contents within this tab group
                const groupButtons = tabGroup.querySelectorAll('.tab-button');
                const groupContents = tabGroup.querySelectorAll('.tab-content');
                
                console.log(`Group has ${groupButtons.length} buttons and ${groupContents.length} contents`);
                
                // Remove active class from all buttons in this group
                groupButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Remove active class from all contents in this group
                groupContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Find and activate the corresponding content
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    console.log(`✅ Activated content: ${tabId}`);
                } else {
                    console.error(`❌ Content not found: ${tabId}`);
                }
            });
        });
        
        // Also handle any existing tab buttons that might be added later
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('tab-button')) {
                const tabId = e.target.getAttribute('data-tab');
                if (tabId) {
                    console.log(`📱 Dynamic tab clicked: ${tabId}`);
                    // The above logic will handle it
                }
            }
        });
    }
    
    // Initialize tab system
    initializeAllTabs();
    
    // Run example functionality
    document.querySelectorAll('.run-example').forEach(button => {
        button.addEventListener('click', function() {
            const example = this.getAttribute('data-example');
            runExample(example);
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .tutorial-card, .resource-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Code copy functionality
    document.querySelectorAll('.code-content').forEach(codeBlock => {
        // Check if copy button already exists
        if (codeBlock.querySelector('.copy-button')) return;
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy code';
        
        copyButton.addEventListener('click', function() {
            const code = codeBlock.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
        
        codeBlock.style.position = 'relative';
        codeBlock.appendChild(copyButton);
    });
    
    console.log('✅ All initialization complete!');
});

// Example runner function
function runExample(exampleType) {
    const button = document.querySelector(`[data-example="${exampleType}"]`);
    if (!button) return;
    
    const originalText = button.innerHTML;
    
    // Show running state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running...';
    button.disabled = true;
    
    // Simulate running the example
    setTimeout(() => {
        // Show success state
        button.innerHTML = '<i class="fas fa-check"></i> Success!';
        button.style.background = '#10b981';
        
        // Show example output
        showExampleOutput(exampleType);
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = '#10b981';
        }, 3000);
    }, 2000);
}

// Show example output with all examples - FIXED: Single consolidated object
function showExampleOutput(exampleType) {
    const allOutputs = {
        // Main page examples
        'screenshot': {
            type: 'success',
            message: 'Screenshot saved as example.png (1280x720)',
            details: 'File size: 145KB | Format: PNG | Full page: true'
        },
        'scraping': {
            type: 'success',
            message: 'Extracted 10 quotes from quotes.toscrape.com',
            details: 'Data: quotes.json | Processing time: 1.2s'
        },
        'automation': {
            type: 'success',
            message: 'Login automation completed successfully',
            details: 'Status: Logged in | Redirect: /dashboard'
        },
        'testing': {
            type: 'success',
            message: 'All tests passed ✓',
            details: 'Tests: 3 passed | Duration: 2.1s'
        },
        
        // Web scraping examples
        'single-element': {
            type: 'success',
            message: 'Single element extracted successfully',
            details: 'Quote: "The world as we have created it is a process of our thinking..." | Author: Albert Einstein'
        },
        'multiple-elements': {
            type: 'success',
            message: 'Multiple elements extracted successfully',
            details: 'Found 10 quotes from 5 different authors'
        },
        'table-scraping': {
            type: 'success',
            message: 'Table data extracted successfully',
            details: 'Headers: Name, Age, City, Country | Rows: 25 data entries'
        },
        
        // Form automation examples
        'text-input': {
            type: 'success',
            message: 'Text input automation completed',
            details: 'Username: john_doe | Email: john@example.com | Message typed with delay'
        },
        'button-clicks': {
            type: 'success',
            message: 'Button interaction automation completed',
            details: 'Submit clicked | Right-click context menu | Double-click area | Hover effects'
        },
        'keyboard-shortcuts': {
            type: 'success',
            message: 'Keyboard shortcuts automation completed',
            details: 'Ctrl+A, Ctrl+C, Ctrl+V | Tab navigation | Enter and Escape keys'
        },
        'dropdown-select': {
            type: 'success',
            message: 'Dropdown selection automation completed',
            details: 'Country: USA | Language: English | Skills: JavaScript, Python, React'
        },
        'checkbox-radio': {
            type: 'success',
            message: 'Checkbox and radio automation completed',
            details: 'Newsletter: checked | Gender: Male | Multiple options selected'
        },
        'file-upload': {
            type: 'success',
            message: 'File upload automation completed',
            details: 'Single file uploaded | Multiple files: 3 selected | Upload progress: 100%'
        },
        'date-time-inputs': {
            type: 'success',
            message: 'Date and time input automation completed',
            details: 'Date: 2024-12-25 | Time: 14:30 | Calendar picker: December 25th selected'
        },
        'form-validation': {
            type: 'success',
            message: 'Form validation handled successfully',
            details: 'Errors detected and fixed | Email validated | Password strength verified'
        },
        'realtime-validation': {
            type: 'success',
            message: 'Real-time validation monitoring completed',
            details: 'Email validation passed | Field monitoring active | Error states cleared'
        },
        'captcha-handling': {
            type: 'success',
            message: 'CAPTCHA handling completed',
            details: 'reCAPTCHA solved | Image CAPTCHA processed | Security measures passed'
        },
        'multi-step-form': {
            type: 'success',
            message: 'Multi-step form automation completed',
            details: '3 steps completed | Personal info → Address → Payment | Final submission successful'
        },
        'dynamic-fields': {
            type: 'success',
            message: 'Dynamic form fields handled',
            details: 'Conditional fields shown | Skills added: 3 | Dependent dropdowns populated'
        },
        'form-testing': {
            type: 'success',
            message: 'Form testing framework executed',
            details: 'Test Results: 85% pass rate | Email: 3/3 tests passed | Password: 2/3 tests passed'
        },
        
        // Advanced technique examples
        'browser-optimization': {
            type: 'success',
            message: 'Browser optimization completed successfully',
            details: 'Launch time: 1.2s | Memory usage: 45MB | Resource blocking: 60% faster'
        },
        'memory-management': {
            type: 'success',
            message: 'Memory management system activated',
            details: 'Page pool: 5 pages | Memory usage: 120MB | Cleanup: automatic'
        },
        'resource-blocking': {
            type: 'success',
            message: 'Resource blocking implemented',
            details: 'Blocked: 45 requests | Allowed: 12 requests | Speed improvement: 75%'
        },
        'parallel-pages': {
            type: 'success',
            message: 'Parallel page processing completed',
            details: 'Pages processed: 10 | Concurrency: 5 | Time saved: 80%'
        },
        'worker-pool': {
            type: 'success',
            message: 'Worker pool system operational',
            details: 'Workers: 4 active | Queue size: 0 | Processing rate: 15 tasks/min'
        },
        'cluster-mode': {
            type: 'success',
            message: 'Cluster mode automation successful',
            details: 'Cluster size: 6 workers | Tasks completed: 25 | Efficiency: 95%'
        },
        'request-interception': {
            type: 'success',
            message: 'Network request interception active',
            details: 'Intercepted: 42 requests | Modified: 8 headers | Blocked: 15 trackers'
        },
        'response-modification': {
            type: 'success',
            message: 'Response modification system deployed',
            details: 'Modified responses: 5 | Injected scripts: 3 | Success rate: 100%'
        },
        'network-monitoring': {
            type: 'success',
            message: 'Network monitoring analysis complete',
            details: 'Requests tracked: 127 | Average response: 450ms | Failed: 2'
        },
        'stealth-mode': {
            type: 'success',
            message: 'Stealth mode navigation successful',
            details: 'Detection flags: 0 | Human behavior: simulated | Success rate: 100%'
        },
        'pdf-generation': {
            type: 'success',
            message: 'PDF generation completed',
            details: 'Generated: report.pdf | Size: 2.4MB | Pages: 12 | Quality: high'
        },
        'mobile-emulation': {
            type: 'success',
            message: 'Mobile device emulation active',
            details: 'Device: iPhone 12 Pro | Viewport: 390x844 | Touch events: enabled'
        },
        'cicd-integration': {
            type: 'success',
            message: 'CI/CD integration configured',
            details: 'Pipeline: GitHub Actions | Tests: 15 passed | Deployment: automated'
        },
        
        // Resource examples
        'real-browser-install': {
            type: 'success',
            message: 'puppeteer-real-browser installation completed',
            details: 'Package installed successfully | xvfb configured for Linux'
        },
        'real-browser-usage': {
            type: 'success',
            message: 'Cloudflare bypass successful',
            details: 'Turnstile captcha solved | Real browser behavior detected'
        },
        'real-browser-advanced': {
            type: 'success',
            message: 'Advanced configuration applied',
            details: 'Custom proxy configured | Real cursor movements enabled'
        },
        'extra-install': {
            type: 'success',
            message: 'puppeteer-extra installation completed',
            details: 'Core package and plugins installed successfully'
        },
        'extra-basic': {
            type: 'success',
            message: 'Basic puppeteer-extra usage successful',
            details: 'Drop-in replacement working | Screenshot captured'
        },
        'extra-plugins': {
            type: 'success',
            message: 'Plugin system activated',
            details: 'Stealth plugin enabled | Adblocker working | Tests passed'
        },
        'stealth-install': {
            type: 'success',
            message: 'Stealth plugin installation completed',
            details: 'Plugin ready for anti-detection automation'
        },
        'stealth-usage': {
            type: 'success',
            message: 'Stealth capabilities tested',
            details: 'Bot detection bypassed | All evasions active'
        },
        'stealth-config': {
            type: 'success',
            message: 'Custom stealth configuration applied',
            details: 'Selective evasions enabled | Headless detection bypassed'
        }
    };
    
    const output = allOutputs[exampleType];
    if (output) {
        showNotification(output.message, output.type, output.details);
    } else {
        console.warn('No output defined for example:', exampleType);
    }
}

// Notification system
function showNotification(message, type = 'success', details = '') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <div>
                <div class="notification-message">${message}</div>
                ${details ? `<div class="notification-details">${details}</div>` : ''}
            </div>
        </div>
        <button class="notification-close">×</button>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            border-left: 4px solid;
            z-index: 1001;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        }
        
        .notification.success {
            border-left-color: #10b981;
        }
        
        .notification.error {
            border-left-color: #ef4444;
        }
        
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
        }
        
        .notification-content i {
            color: #10b981;
            font-size: 1.25rem;
            margin-top: 0.125rem;
        }
        
        .notification-message {
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 0.25rem;
        }
        
        .notification-details {
            font-size: 0.875rem;
            color: #6b7280;
        }
        
        .notification-close {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #9ca3af;
            padding: 0.25rem;
        }
        
        .notification-close:hover {
            color: #374151;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add copy button styles
const copyButtonStyle = document.createElement('style');
copyButtonStyle.textContent = `
    .copy-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.875rem;
    }
    
    .copy-button:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(copyButtonStyle);
