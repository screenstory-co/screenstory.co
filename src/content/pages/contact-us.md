---
title: "Contact Us"
description: "Get in touch with Screen Story Co."
---

Fill out the form below and we'll be in touch shortly.

<form action="/api/contact" method="POST" class="form-contact">
  <div class="form-row">
    <label for="name">Name *</label>
    <input type="text" id="name" name="name" required />
  </div>

  <div class="form-row">
    <label for="company">Company / Organisation *</label>
    <input type="text" id="company" name="company" required />
  </div>

  <div class="form-row">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required />
  </div>

  <div class="form-row">
    <label for="phone">Phone Number *</label>
    <input type="tel" id="phone" name="phone" required />
  </div>

  <div class="form-row">
    <label for="interest">Interest Area *</label>
    <select id="interest" name="interest" required>
      <option value="">Select...</option>
      <option value="Digital Strategy">Digital Strategy</option>
      <option value="Online Presence">Online Presence</option>
      <option value="Content Production">Content Production</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <div class="form-row">
    <label for="message">Enquiry *</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>

  <div class="form-row form-checkbox">
    <input type="checkbox" id="marketing_consent" name="marketing_consent" value="yes" />
    <label for="marketing_consent">I agree to receiving marketing and promotional materials</label>
  </div>

  <div class="form-row">
    <button type="submit" class="btn-submit">Submit</button>
  </div>
</form>
