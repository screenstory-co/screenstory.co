---
title: "Business Profiler"
description: "Complete the business profiler below to help you and us identify the areas that will be of most benefit to your business."
---

* Indicates required field

<form action="/api/business-profiler" method="POST" class="form-profiler">

  <div class="form-row">
    <label>Name *</label>
    <input type="text" name="first_name" placeholder="First" required />
    <input type="text" name="last_name" placeholder="Last" required />
  </div>

  <div class="form-row">
    <label for="business_name">Business Name *</label>
    <input type="text" id="business_name" name="business_name" required />
  </div>

  <div class="form-row">
    <label for="website">Website (if any) *</label>
    <input type="url" id="website" name="website" placeholder="Your existing or intended website" required />
  </div>

  <div class="form-row">
    <label for="phone">Phone Number *</label>
    <input type="tel" id="phone" name="phone" required />
  </div>

  <div class="form-row">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required />
  </div>

  <div class="form-row">
    <label for="company_description">What does your company do? What are the products and services you offer? *</label>
    <textarea id="company_description" name="company_description" rows="4" placeholder="A brief description of the core business. This can include industry, products and services." required></textarea>
  </div>

  <div class="form-row">
    <label for="target_market">What is your target market? *</label>
    <textarea id="target_market" name="target_market" rows="3" placeholder="This can include geographical region, demographics. The more detailed the more effective your marketing initiatives." required></textarea>
  </div>

  <div class="form-row">
    <label>Will you be selling products on your website? (eCommerce) *</label>
    <div class="radio-group">
      <label><input type="radio" name="ecommerce" value="Yes" required /> Yes</label>
      <label><input type="radio" name="ecommerce" value="No" /> No</label>
      <label><input type="radio" name="ecommerce" value="Unsure" /> Unsure</label>
    </div>
  </div>

  <div class="form-row">
    <label>Preferred method of content production *</label>
    <div class="radio-group">
      <label><input type="radio" name="content_production" value="Inhouse" required /> Inhouse</label>
      <label><input type="radio" name="content_production" value="Outsourced" /> Outsourced</label>
      <label><input type="radio" name="content_production" value="Mixed" /> Mixed</label>
    </div>
    <p class="help-text">Thinking about your content strategy, do you generate content internally or through a third party?</p>
  </div>

  <div class="form-row">
    <label>Branding / Logo *</label>
    <div class="radio-group">
      <label><input type="radio" name="has_branding" value="Yes" required /> Yes</label>
      <label><input type="radio" name="has_branding" value="No" /> No</label>
    </div>
    <p class="help-text">Do you have a logo or brandkit?</p>
  </div>

  <div class="form-row">
    <label for="comments">Other comments</label>
    <textarea id="comments" name="comments" rows="3"></textarea>
  </div>

  <div class="form-row">
    <label>What budget have you allocated for this project? *</label>
    <div class="radio-group">
      <label><input type="radio" name="budget" value="Under $3K" required /> Under $3K</label>
      <label><input type="radio" name="budget" value="$3K - $6K" /> $3K - $6K</label>
      <label><input type="radio" name="budget" value="$6K - $10K" /> $6K - $10K</label>
      <label><input type="radio" name="budget" value="$10K - $20K" /> $10K - $20K</label>
      <label><input type="radio" name="budget" value="Over $20K" /> Over $20K</label>
    </div>
    <p class="help-text">This will help you and us prioritise the design and functional elements of the site.</p>
  </div>

  <div class="form-row">
    <button type="submit" class="btn-submit">Submit</button>
  </div>
</form>
