const sgMail = require("@sendgrid/mail");

// Render the G-Star Coming Soon form
const renderGstarForm = async function (req, res, next) {
  try {
    const userAgent = req.headers["user-agent"]?.toLowerCase() || "";
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(userAgent);
    const host = req.headers.host || "unknown host";

    console.log(`renderGstarForm : G-STAR Form Request Received`);
    console.log(`renderGstarForm: Host: ${host}`);
    console.log(`renderGstarForm: Device Type: ${isMobile ? "Mobile" : "Desktop"}`);

    const imageUrlGstar = isMobile
      ? "https://static.aceomniv1.uat.cmsaceturtle.com/stag/banner-images/mobile/G-Star%20Hero%20Banner%20(Mobile).jpg"
      : "https://static.aceomniv1.uat.cmsaceturtle.com/stag/banner-images/web/G-Star%20Hero%20Banner%20(Desktop).jpg";

    res.status(200).send(`
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>G-Star Launching Soon</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url('${imageUrlGstar}') no-repeat center center fixed;
          background-size: cover;
          overflow: hidden;
        }
        form {
          position: relative;
          z-index: 1;
          /* background: rgba(21, 19, 19, 0.25);
          backdrop-filter: blur(1px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35); */
          padding: 40px 30px;
          text-align: center;
          max-width: 420px;
          width: 90%;
          color: #fff;
        }
        .logo img {
          width: 60%;
          margin-bottom: 15px;
        }
        h2 {
          font-size: 26px;
          margin-bottom: 12px;
          font-weight: 700;
        }
        .tagline {
          font-size: 15px;
          color: #f1f1f1;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .info-text {
          font-size: 14px;
          line-height: 1.6;
          color: #f1f1f1;
          margin-bottom: 16px;
        }
        input, button {
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          border-radius: 6px;
          border: none;
          outline: none;
          font-size: 14px;
          box-sizing: border-box;
        }
        input {
          background: rgba(255, 255, 255, 0.9);
          color: #000;
        }
        input::placeholder {
          color: #555;
        }
        button {
          background: #00385F;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        button:hover {
          transform: scale(1.02);
        }
        .msg {
          text-align: center;
          margin-top: 10px;
          font-weight: bold;
          color: #fff;
        }
        @media (max-width: 480px) {
          form {
            padding: 25px 20px;
            width: 80%;
            /*background: rgba(21, 19, 19, 0.4);
            backdrop-filter: blur(1px);
            border-radius: 14px;*/
          }
          .logo img {
            width: 65%;
            margin-bottom: 10px;
          }
          h2 {
            font-size: 22px;
          }
          .tagline {
            font-size: 13px;
          }
          .info-text {
            font-size: 13px;
            margin-bottom: 20px;
          }
          input {
            font-size: 13px;
            padding: 10px;
          }
          button {
            font-size: 14px;
            padding: 10px;
          }
        }
      </style>
    </head>
    <body>
      <form id="enquiryForm">
        <div class="logo">
          <img src="https://static.aceomni.cmsaceturtle.com/prod/webshop/gstar Icon.svg" alt="G-Star Logo">
        </div>

        
        <p class="info-text">
          A new <strong>G-Star online experience</strong> is loading.<br>
          We’re putting the final touches on something fresh.<br><br>
          Sign up now for <strong>early access, exclusive offers,</strong><br>
          and the inside track on our launch.
        </p>      

        <input type="text" name="name" placeholder="Your Name *" required />
        <input type="email" name="email" placeholder="Email" />
        <input type="tel" name="mobile_number" placeholder="Contact Number" />
        <button type="submit">Unlock Early Access</button>
        <div class="msg" id="msg"></div>
      </form>

     <script>
  const form = document.getElementById("enquiryForm");
  const msg = document.getElementById("msg");

  // Disable browser's native validation
  form.setAttribute("novalidate", true);

  // Limit mobile number to 10 digits only
  form.mobile_number.addEventListener("input", () => {
    form.mobile_number.value = form.mobile_number.value.replace(/[^0-9]/g, "").slice(0, 10);
  });

  // Reset on focus
  [form.name, form.email, form.mobile_number].forEach((input) => {
    input.addEventListener("focus", () => {
      input.style.border = "1px solid transparent";
      msg.textContent = "";
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";
    msg.style.color = "red";

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const mobile = form.mobile_number.value.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\\.[A-Za-z]{2,})+$/;
    const mobileRegex = /^[0-9]{10}$/;

    // Reset borders
    [form.name, form.email, form.mobile_number].forEach((i) => {
      i.style.border = "1px solid transparent";
    });

    // Validate Name
    if (!name) {
      form.name.style.border = "1px solid red";
      msg.textContent = "Please enter your name.";
      return;
    }

    // Require either email or mobile
    if (!email && !mobile) {
      form.email.style.border = form.mobile_number.style.border = "1px solid red";
      msg.textContent = "Please provide either Email or Contact Number.";
      return;
    }

    // Validate Email if entered
    if (email && !emailRegex.test(email)) {
      form.email.style.border = "1px solid red";
      msg.textContent = "Please enter a valid email address (e.g. name@example.com).";
      return;
    }

    // Validate Mobile if entered
    if (mobile && !mobileRegex.test(mobile)) {
      form.mobile_number.style.border = "1px solid red";
      msg.textContent = "Mobile number must be exactly 10 digits.";
      return;
    }

    //All validations passed
    try {
      const res = await fetch("/api/v1/gstar-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile_number: mobile }),
      });

      const out = await res.json();
      msg.style.color = out.status ? "lightgreen" : "red";
      msg.textContent =
        out.message ||
        (out.status ? "Submitted successfully!" : "Submission failed. Please try again.");
      if (out.status) form.reset();
    } catch (err) {
      msg.style.color = "red";
      msg.textContent = "Something went wrong. Please try again.";
    }
  });
</script>
    </body>
    </html>
  `);
  } catch (error) {
    console.error(`renderGstarForm : Render G-Star Form Error =>, ${error.message}`);
    next(error)
  }
}


// Handle form submission (SendGrid)
const sendGstarEnquiryMail = async function (req, res, next) {
  try {
    const { name, email, mobile_number } = req.body;

    console.log(`sendGstarEnquiryMail: G-STAR Enquiry Received — Name: ${name}, Email: ${email || "N/A"}, Mobile: ${mobile_number || "N/A"}`);

    if (!name)
      return res.json({ status: false, message: "Name is required" });
    if (!email && !mobile_number)
      return res.json({
        status: false,
        message: "Please provide email or contact number",
      });

    // Use API key from environment for safety
    let apiKey = process.env.SENDGRID_API_KEY || "";
    if (!apiKey) {
      console.error("SENDGRID_API_KEY not set in environment");
      return res.status(500).json({ status: false, message: "Server misconfiguration" });
    }

    let sender = process.env.SENDER_EMAIL || "customer.care@augustpurple.com";
    let reciever = ["saravana.kumar@aceturtle.com","saikumar.reddy@aceturtle.com"]
    let body = JSON.stringify(req.body);
    sgMail.setApiKey(apiKey);
    const html = `
      <html><body style="font-family:Arial;">
        <h2>G-STAR Enquiry Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email || "N/A"}</p>
        <p><strong>Contact:</strong> ${mobile_number || "N/A"}</p>
      </body></html>`;
    let message = {
      to: reciever,
      from: sender,
      subject: `G-STAR Enquiry from ${name}`,
      text: body,
      html: html,
    };
    sgMail.send(message).then(() => {
      console.log("sent successfully")
      return res.status(200).send({
        status: true,
        message: "We’ll only contact you with launch updates and offers — no spam, just denim.  "
      })
    }).catch((err) => {
      console.error("SendGrid send error", err);
      return res.status(500).json({ status: false, message: "Failed to send email" });
    });

  } catch (error) {
    console.error(`sendGstarEnquiryMail : SendGrid Error => ${error.message}`);
    next(error)
  }
}


module.exports = { renderGstarForm, sendGstarEnquiryMail };
