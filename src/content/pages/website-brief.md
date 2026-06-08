---
title: "Website Brief"
description: "Tell us about your website project."
---

* Indicates required field

<form action="/api/website-brief" method="POST" class="form-profiler" enctype="multipart/form-data">

  <div class="form-row">
    <label>Name *</label>
    <input type="text" name="first_name" placeholder="First" required />
    <input type="text" name="last_name" placeholder="Last" required />
  </div>

  <div class="form-row">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required />
  </div>

  <div class="form-row">
    <label for="business_name">What is your business name? *</label>
    <input type="text" id="business_name" name="business_name" required />
  </div>

  <div class="form-row">
    <label>Do you have a logo or brandkit? *</label>
    <div class="radio-group">
      <label><input type="radio" name="has_branding" value="Yes" required /> Yes</label>
      <label><input type="radio" name="has_branding" value="No" /> No</label>
    </div>
    <p class="help-text">This can include suitable logos and banners for social media properties.</p>
  </div>

  <div class="form-row">
    <label for="target_audience">Describe your organization and its target audience *</label>
    <textarea id="target_audience" name="target_audience" rows="4" required></textarea>
  </div>

  <div class="form-row">
    <label for="specific_needs">Is there anything specific you'd like us to consider? *</label>
    <textarea id="specific_needs" name="specific_needs" rows="4" required></textarea>
  </div>

  <div class="form-row">
    <label for="assets">Do you have any images, sketches or documents that might be helpful?</label>
    <input type="file" id="assets" name="assets" accept="image/*,.pdf,.doc,.docx" />
    <p class="help-text">Max file size: 20MB. E.g. Your current logo, photos, illustrations, content, layout ideas etc.</p>
  </div>

  <div class="form-row">
    <label>Would you like us to develop content (copy, photo and video) for your site? *</label>
    <div class="radio-group">
      <label><input type="radio" name="content_development" value="Yes" required /> Yes</label>
      <label><input type="radio" name="content_development" value="No, we will provide our own content" /> No, we will be providing our own content</label>
      <label><input type="radio" name="content_development" value="Unsure" /> Unsure</label>
    </div>
    <p class="help-text">Websites are powered by an easy to use content management system which does not require a developer to update.</p>
  </div>

  <div class="form-row">
    <label for="style_ideas">What ideas do you have for the style of your website? *</label>
    <textarea id="style_ideas" name="style_ideas" rows="4" required></textarea>
  </div>

  <div class="form-row">
    <label for="pages_needed">What pages would you like displayed on your website? *</label>
    <textarea id="pages_needed" name="pages_needed" rows="3" placeholder="These are the top level pages that will be accessible from the navigation bar e.g. Home, About, Contact Us, Products etc" required></textarea>
  </div>

  <div class="form-row">
    <label for="website_1">Website you like #1 *</label>
    <input type="url" id="website_1" name="website_1" placeholder="What do you like about this website?" required />
    <textarea name="website_1_notes" rows="2" placeholder="What do you like about this website?"></textarea>
  </div>

  <div class="form-row">
    <label for="website_2">Website you like #2</label>
    <input type="url" id="website_2" name="website_2" placeholder="What do you like about this website?" />
    <textarea name="website_2_notes" rows="2" placeholder="What do you like about this website?"></textarea>
  </div>

  <div class="form-row">
    <button type="submit" class="btn-submit">Submit Brief</button>
  </div>
</form>
