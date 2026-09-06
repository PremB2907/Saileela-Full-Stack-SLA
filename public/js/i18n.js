const translations = {
  en: {
    mandal_full_title: 'Saileela Mandal Palkhi', mandal_name_header: 'Saileela Mandal', mandal_sub_header: 'Palkhi Seva & Devotee Care',
    nav_home: 'Home', nav_about: 'About', nav_schedule: 'Palkhi / Yatra', nav_glimpses: 'Gallery', nav_socialwork: 'Seva', nav_committee: 'Committee', nav_contact: 'Contact', nav_donate: 'Donate / Seva', nav_dbt: 'Bank Transfer', nav_admin: 'Admin',
    hero_tag: 'SHRI SAILEELA', hero_title: 'Saileela Mandal Palkhi', hero_subtitle: 'A calm digital home for Sai devotion, Palkhi participation and seva.', hero_primary: 'Explore the Palkhi', hero_secondary: 'Offer Seva', hero_note: 'Official dates, route and announcements will appear here when confirmed by the mandal.',
    about_badge: 'The Saileela story', about_title: 'Devotion carried forward through seva', about_text: 'Saileela Mandal Palkhi brings devotees together around Sai devotion, shared participation and service.',
    schedule_title: 'Palkhi / Yatra', schedule_sub: 'Route, dates and halt information will be published after official confirmation.', gallery_title: 'Saileela gallery', gallery_sub: 'Official Saileela photographs will be added here. Legacy festival imagery has been removed.', seva_title: 'Seva', seva_sub: 'Support for Saileela seva will be configured with verified categories and details.',
    donate_title: 'Saileela Seva Donation', donate_sub: 'Offer a contribution to Saileela Mandal Palkhi. Tax claims and official categories are shown only after verification.', contact_title: 'Contact Saileela Mandal', contact_sub: 'Use the form for a message. Official contact details will be published after confirmation.', footer_desc: 'Saileela Mandal Palkhi. Devotion, participation and seva.', footer_copyright: '© Saileela Mandal Palkhi. All rights reserved.',
    lbl_select_amount: 'Select contribution amount (INR)', lbl_custom_amount: 'Or enter another amount (INR)', lbl_donor_name: 'Full name', ph_donor_name: 'Enter your full name', lbl_mobile: 'Mobile number', ph_mobile: 'Enter your mobile number', lbl_email: 'Email (optional)', ph_email: 'Email for acknowledgement', btn_donate_submit: 'Continue to secure payment', donate_form_title: 'Seva contribution'
  },
  mr: {
    mandal_full_title: 'साईलीला मंडळ पालखी', mandal_name_header: 'साईलीला मंडळ', mandal_sub_header: 'पालखी सेवा व भाविकांची काळजी', nav_home: 'मुखपृष्ठ', nav_about: 'आमच्याबद्दल', nav_schedule: 'पालखी / यात्रा', nav_glimpses: 'छायाचित्रे', nav_socialwork: 'सेवा', nav_committee: 'कार्यकारिणी', nav_contact: 'संपर्क', nav_donate: 'देणगी / सेवा', nav_dbt: 'बँक हस्तांतरण', nav_admin: 'प्रशासन',
    hero_tag: 'श्री साईलीला', hero_title: 'साईलीला मंडळ पालखी', hero_subtitle: 'साईभक्ती, पालखी सहभाग आणि सेवेसाठी एक शांत डिजिटल स्थान.', hero_primary: 'पालखीची माहिती', hero_secondary: 'सेवा अर्पण करा', hero_note: 'अधिकृत पुष्टी झाल्यानंतर तारीख, मार्ग आणि सूचना येथे प्रसिद्ध केल्या जातील.',
    about_badge: 'साईलीलेचा परिचय', about_title: 'सेवेतून पुढे नेली जाणारी भक्ती', about_text: 'साईलीला मंडळ पालखी साईभक्ती, सामूहिक सहभाग आणि सेवेसाठी भाविकांना जोडते.', schedule_title: 'पालखी / यात्रा', schedule_sub: 'अधिकृत पुष्टीनंतर मार्ग, तारीख आणि मुक्कामाची माहिती प्रसिद्ध केली जाईल.', gallery_title: 'साईलीला छायाचित्र संग्रह', gallery_sub: 'अधिकृत साईलीला छायाचित्रे उपलब्ध झाल्यावर येथे जोडली जातील.', seva_title: 'सेवा', seva_sub: 'पडताळलेल्या सेवा प्रकारांसह साईलीला सेवेची माहिती लवकरच प्रसिद्ध केली जाईल.',
    donate_title: 'साईलीला सेवा देणगी', donate_sub: 'साईलीला मंडळ पालखीसाठी योगदान द्या. पडताळणीशिवाय करसवलत किंवा अधिकृत श्रेणींचा दावा केला जाणार नाही.', contact_title: 'साईलीला मंडळाशी संपर्क', contact_sub: 'संदेशासाठी फॉर्म वापरा. अधिकृत संपर्क तपशील पुष्टीनंतर प्रसिद्ध केले जातील.', footer_desc: 'साईलीला मंडळ पालखी. भक्ती, सहभाग आणि सेवा.', footer_copyright: '© साईलीला मंडळ पालखी. सर्व हक्क राखीव.',
    lbl_select_amount: 'देणगीची रक्कम निवडा (रुपये)', lbl_custom_amount: 'किंवा दुसरी रक्कम टाका (रुपये)', lbl_donor_name: 'संपूर्ण नाव', ph_donor_name: 'संपूर्ण नाव टाका', lbl_mobile: 'मोबाईल क्रमांक', ph_mobile: 'मोबाईल क्रमांक टाका', lbl_email: 'ईमेल (ऐच्छिक)', ph_email: 'पावतीसाठी ईमेल', btn_donate_submit: 'सुरक्षित पेमेंटसाठी पुढे जा', donate_form_title: 'सेवा योगदान'
  }
};

function setLanguage(lang) {
  if (typeof document === 'undefined') return;
  lang = lang === 'en' ? 'en' : 'mr';
  try { localStorage.setItem('saileela_lang', lang); } catch (e) {}
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  document.querySelectorAll('.lang-btn').forEach((button) => button.classList.toggle('active', button.dataset.lang === lang));
  document.cookie = `saileela_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  const values = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = values[element.dataset.i18n];
    if (value === undefined) return;
    if (element.matches('input, textarea')) element.placeholder = value;
    else element.textContent = value;
  });
  window.dispatchEvent(new CustomEvent('saileelaLanguageChanged', { detail: { lang } }));
}

document.addEventListener('DOMContentLoaded', () => {
  let lang = 'mr';
  try { lang = localStorage.getItem('saileela_lang') || lang; } catch (e) {}
  setLanguage(lang);
  document.querySelectorAll('.lang-btn').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
});
