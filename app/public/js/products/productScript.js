let qs = (elemento) => {
      return document.querySelector(elemento);
};
window.addEventListener("load", () => {
      let $inputName = qs("#name"),
            $nameErrors = qs("#nameErrors"),
            $price = qs("#price"),
            $priceErrors = qs("#priceErrors"),
            $discount = qs("#discount"),
            $discountErrors = qs("#discountErrors"),
            $description = qs("#description"),
            $descriptionErrors = qs("#descriptionErrors"),
            $category = qs("#category"),
            $categoryErrors = qs("#categoryErrors"),
            $subcategory = qs("#subcategory"),
            $subcategoryErrors = qs("#subcategoryErrors"),
            $sold = qs("#sold"),
            $soldErrors = qs("#soldErrors"),
            $stock = qs("#stock"),
            $stokErrors = qs("#stokErrors"),
            $form = qs("#form"),
            $file = qs("#image"),
            $fileErrors = qs("#fileErrors");
      (regExName = /^[a-zA-Z\sñáéíóúü ]{2,30}$/),
            (regExLastName = /^[a-zA-Z\sñáéíóúü ]{2,20}$/),
            (regExDNI = /^[0-9]{7,8}$/),
            (regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i),
            (regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,12}$/);

      $inputName.addEventListener("blur", () => {
            switch (true) {
                  case !$inputName.value.trim():
                        $nameErrors.innerText = "El campo nombre es obligatorio";
                        $inputName.classList.add("is-invalid");
                        break;
                  case !regExName.test($inputName.value):
                        $nameErrors.innerText = "Nombre invalido";
                        $inputName.classList.add("is-invalid");
                        break;
                  default:
                        $inputName.classList.remove("is-invalid");
                        $inputName.classList.add("is-valid");
                        $nameErrors.innerText = "";
                        break;
            }
      });
      $form.addEventListener("submit", (event) => {
            event.preventDefault();
            const FORM_ELEMENTS = event.target.elements;

            for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
                  const element = FORM_ELEMENTS[index];
                  if (element.value === "" && element.type !== "file") {
                        element.classList.add("is-invalid");
                        element.dispatchEvent(new Event("blur"));
                  }
            }

            if (!$terms.checked) {
                  $terms.classList.add("is-invalid");
                  $termsErrors.innerHTML = "Debes aceptar las bases y condiciones";
            }

            let elementosConErrores = document.querySelectorAll(".is-invalid");
            let errores = elementosConErrores.length > 0;

            if (errores) {
                  submitErrors.innerText = "Hay errores en el formulario";
            } else {
                  $form.submit();
            }
      });
});
