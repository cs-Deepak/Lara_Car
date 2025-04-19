const form = document.getElementById('registrationForm');
        const formSteps = document.querySelectorAll('.form-step');
        const progressSteps = document.querySelectorAll('.progress-step');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const paymentOptions = document.querySelectorAll('.payment-option');
        const paymentDetails = document.getElementById('paymentDetails');
        const paymentPopup = document.getElementById('paymentPopup');
        const buyOrRentSelect = document.getElementById('buyOrRent');
        const rentalDates = document.getElementById('rentalDates');

        let currentStep = 0;

        nextBtn.addEventListener('click', () => {
            if (validateStep()) {
                if (currentStep === 2) {
                    showPaymentPopup();
                } else {
                    currentStep++;
                    updateFormSteps();
                }
            }
        });

        prevBtn.addEventListener('click', () => {
            currentStep--;
            updateFormSteps();
        });

        paymentOptions.forEach(option => {
            option.addEventListener('click', () => {
                paymentOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                updatePaymentDetails(option.dataset.method);
            });
        });

        buyOrRentSelect.addEventListener('change', () => {
            if (buyOrRentSelect.value === 'rent') {
                rentalDates.style.display = 'block';
            } else {
                rentalDates.style.display = 'none';
            }
        });

        function updateFormSteps() {
            formSteps.forEach((step, index) => {
                if (index === currentStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });

            progressSteps.forEach((step, index) => {
                if (index <= currentStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });

            if (currentStep === 0) {
                prevBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'inline-block';
            }

            if (currentStep === formSteps.length - 1) {
                nextBtn.textContent = 'Confirm Booking';
            } else {
                nextBtn.textContent = 'Next';
            }
        }

        function validateStep() {
            const inputs = formSteps[currentStep].querySelectorAll('input, select');
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            return isValid;
        }

        function updatePaymentDetails(method) {
            let detailsHTML = '';
            switch (method) {
                case 'upi':
                    detailsHTML = `
                        <div class="qr-code" onclick="openUPI()">
                            <img src="images/upijpeg height=150&width=150" alt="UPI QR Code">
                            UPI QR Code (Touch to open)
                        </div>
                        <p>Scan the QR code or touch to open UPI app</p>
                    `;
                    break;
                case 'phonepe':
                    detailsHTML = `
                        <div class="qr-code">
                            <img src="/placeholder.svg?height=150&width=150" alt="PhonePe QR Code">
                            PhonePe QR Code
                        </div>
                        <p>Scan the QR code to make the payment</p>
                    `;
                    break;
                case 'paytm':
                    detailsHTML = `
                        <div class="qr-code">
                            <img src="/placeholder.svg?height=150&width=150" alt="Paytm QR Code">
                            Paytm QR Code
                        </div>
                        <p>Scan the QR code to make the payment</p>
                    `;
                    break;
                case 'paypal':
                    detailsHTML = `
                        <div class="form-group">
                            <label for="paypalEmail">PayPal  Email</label>
                            <input type="email" id="paypalEmail" name="paypalEmail" required>
                        </div>
                        <button class="btn" onclick="simulatePayPalPayment()">Pay with PayPal</button>
                    `;
                    break;
                case 'card':
                    detailsHTML = `
                        <div class="form-group">
                            <label for="cardNumber">Card Number</label>
                            <input type="text" id="cardNumber" name="cardNumber" required>
                        </div>
                        <div class="form-group">
                            <label for="expiryDate">Expiry Date</label>
                            <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required>
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" name="cvv" required>
                        </div>
                        <button class="btn" onclick="simulateCardPayment()">Pay with Card</button>
                    `;
                    break;
            }
            paymentDetails.innerHTML = detailsHTML;
        }

        function openUPI() {
            // In a real implementation, this would open the UPI app
            alert('Opening UPI app...');
        }

        function showPaymentPopup() {
            paymentPopup.style.display = 'flex';
        }

        function closePopup() {
            paymentPopup.style.display = 'none';
            currentStep++;
            updateFormSteps();
            updateBookingSummary();
        }

        function updateBookingSummary() {
            const summary = document.getElementById('bookingSummary');
            const formData = new FormData(form);
            let summaryHTML = '';
            for (let [key, value] of formData.entries()) {
                summaryHTML += `<p><strong>${key}:</strong> ${value}</p>`;
            }
            summary.innerHTML = summaryHTML;
        }

        function simulatePayPalPayment() {
            showPaymentPopup();
        }

        function simulateCardPayment() {
            showPaymentPopup();
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Booking confirmed! Thank you for choosing our service.');
            form.reset();
            currentStep = 0;
            updateFormSteps();
        });

        /*Invoive Template */

        // function downloadInvoice() {
        //     const { jsPDF } = window.jspdf;
        //     const doc = new jsPDF();

        //     const formData = new FormData(form);
        //     let y = 20;

        //     doc.setFontSize(20);
        //     doc.text('Car Buy & Rent Invoice', 105, y, { align: 'center' });
        //     y += 20;

        //     doc.setFontSize(12);
        //     for (let [key, value] of formData.entries()) {
        //         doc.text(`${key}: ${value}`, 20, y);
        //         y += 10;
        //     }

        //     // Add total amount (you would calculate this based on actual data)
        //     doc.text('Total Amount: $500', 20, y);

        //     doc.save('car_buy_rent_invoice.pdf');
        // }

        function downloadInvoice() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const form = document.querySelector('#yourFormId'); // replace with your actual form ID
            const formData = new FormData(form);
        
            let y = 20;
            let total = 0;
        
            // HEADER SECTION
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text("🚗 Car Buy & Rent Invoice", 105, y, { align: "center" });
            y += 10;
        
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 150, y);
            doc.text(`Invoice No: INV-${Date.now().toString().slice(-6)}`, 20, y);
            y += 10;
        
            doc.setDrawColor(100);
            doc.line(20, y, 190, y); // separator line
            y += 10;
        
            // CUSTOMER/FORM DETAILS
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Customer Details", 20, y);
            y += 8;
        
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
        
            for (let [key, value] of formData.entries()) {
                // Avoid displaying empty fields
                if (value.trim() !== "") {
                    doc.text(`${capitalize(key)}:`, 25, y);
                    doc.text(`${value}`, 70, y);
                    y += 8;
                }
        
                // Basic total extraction (for price fields)
                if (key.toLowerCase().includes("price")) {
                    total += parseFloat(value) || 0;
                }
            }
        
            y += 5;
            doc.line(20, y, 190, y); // separator line
            y += 10;
        
            // TOTAL AMOUNT SECTION
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Total Payable:", 25, y);
            doc.setTextColor(0, 128, 0); // green
            doc.text(`$${total.toFixed(2)}`, 70, y);
            doc.setTextColor(0, 0, 0); // reset color
        
            y += 15;
            doc.setFontSize(10);
            doc.text("Thank you for choosing our service!", 105, y, { align: "center" });
        
            // Save the file
            doc.save("car_buy_rent_invoice.pdf");
        
            // Capitalize helper function
            function capitalize(str) {
                return str
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase());
            }
        }
        