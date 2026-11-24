const menuToggle = document.getElementById("menuToggle");
2
const mainNav = document.getElementById("mainNav");
3
const helpForm = document.getElementById("helpForm");
4
const currentYear = document.getElementById("currentYear");
5

6
// Ano atual no rodapé
7
if (currentYear) {
8
  currentYear.textContent = new Date().getFullYear();
9
}
10

11
// Menu mobile
12
if (menuToggle && mainNav) {
13
  menuToggle.addEventListener("click", () => {
14
    const isOpen = mainNav.classList.toggle("open");
15

16
    menuToggle.setAttribute("aria-expanded", String(isOpen));
17
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
18
  });
19

20
  mainNav.querySelectorAll("a").forEach((link) => {
21
    link.addEventListener("click", () => {
22
      mainNav.classList.remove("open");
23
      menuToggle.setAttribute("aria-expanded", "false");
24
      menuToggle.setAttribute("aria-label", "Abrir menu");
25
    });
26
  });
27
}
28

29
// Validação do formulário
30
function setError(fieldId, errorId, message) {
31
  const field = document.getElementById(fieldId);
32
  const error = document.getElementById(errorId);
33

34
  if (!field || !error) {
35
    return;
36
  }
37

38
  field.classList.toggle("invalid", Boolean(message));
39
  error.textContent = message;
40
}
41

42
function validateEmail(email) {
43
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
44
}
45

46
if (helpForm) {
47
  helpForm.addEventListener("submit", (event) => {
48
    event.preventDefault();
49

50
    const name = document.getElementById("name").value.trim();
51
    const email = document.getElementById("email").value.trim();
52
    const topic = document.getElementById("topic").value;
53
    const message = document.getElementById("message").value.trim();
54
    const consent = document.getElementById("consent").checked;
55
    const formSuccess = document.getElementById("formSuccess");
56

57
    const nameOk = name.length >= 2;
58
    const emailOk = validateEmail(email);
59
    const topicOk = Boolean(topic);
60
    const messageOk = message.length >= 10;
61

62
    setError("name", "nameError", nameOk ? "" : "Digite pelo menos dois caracteres.");
63
    setError("email", "emailError", emailOk ? "" : "Digite um e-mail válido.");
64
    setError("topic", "topicError", topicOk ? "" : "Selecione uma opção.");
65
    setError(
66
      "message",
67
      "messageError",
68
      messageOk ? "" : "Escreva uma mensagem com pelo menos dez caracteres."
69
    );
70
    setError(
71
      "consent",
72
      "consentError",
73
      consent ? "" : "Confirme que entendeu as orientações do formulário."
74
    );
75

76
    if (!(nameOk && emailOk && topicOk && messageOk && consent)) {
77
      formSuccess.classList.remove("visible");
78
      return;
79
    }
80

81
    formSuccess.classList.add("visible");
82
    helpForm.reset();
83

84
    document.querySelectorAll(".form-error").forEach((error) => {
85
      error.textContent = "";
86
    });
87

88
    document
89
      .querySelectorAll(".form-group input, .form-group select, .form-group textarea")
90
      .forEach((field) => field.classList.remove("invalid"));
91
  });
92
}
93
