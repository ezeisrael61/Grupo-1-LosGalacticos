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
      $price.addEventListener("blur", () => {
            switch (true) {
                  case !$price.value :
                        $priceErrors.innerText = "El campo precio es obligatorio";
                        $price.classList.add("is-invalid");
                        break;
                  default:
                        $price.classList.remove("is-invalid");
                        $price.classList.add("is-valid");
                        $priceErrors.innerText = "";
                        break;
            }
      });
      $discount.addEventListener("blur", () => {          
            const isValidNumberInRange = (value) => {
                  let valuediscount=$discount.value
                  const parsedValue = parseFloat(valuediscount);
                  return !isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 75;
                };
            switch (true) {
                  
                  case !$discount.value :
                        $discountErrors.innerText = "El campo descuento es obligatorio";
                        $discount.classList.add("is-invalid");
                        break;
                  case isValidNumberInRange :
                        $discountErrors.innerText = "El campo Descuento no valido, debe ser entre 0-75";
                        $discount.classList.add("is-invalid");
                        break;

                  default:
                        $discount.classList.remove("is-invalid");
                        $discount.classList.add("is-valid");
                        $discountErrors.innerText = "";
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


            let elementosConErrores = document.querySelectorAll(".is-invalid");
            let errores = elementosConErrores.length > 0;

            if (errores) {
                  submitErrors.innerText = "Hay errores en el formulario";
            } else {
                  $form.submit();
            }
      });
});
