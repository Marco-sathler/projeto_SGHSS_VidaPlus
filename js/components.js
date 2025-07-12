// ===== COMPONENTES REUTILIZÁVEIS =====

class Components {
    static createButton(text, type = 'primary', icon = null, onClick = null) {
        const button = document.createElement('button');
        button.className = `btn-${type}`;
        button.innerHTML = icon ? `<i class="fas fa-${icon}"></i> ${text}` : text;
        
        if (onClick) {
            button.addEventListener('click', onClick);
        }
        
        return button;
    }

    static createCard(title, content, actions = []) {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class="card-header">
                <h3>${title}</h3>
            </div>
            <div class="card-body">
                ${content}
            </div>
            ${actions.length > 0 ? `
                <div class="card-actions">
                    ${actions.map(action => action.outerHTML).join('')}
                </div>
            ` : ''}
        `;
        
        return card;
    }

    static createModal(title, content, onClose = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        modal.innerHTML = `
            <div class="modal-container">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            if (onClose) onClose();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                if (onClose) onClose();
            }
        });
        
        return modal;
    }

    static createTable(headers, data, actions = []) {
        const table = document.createElement('table');
        table.className = 'data-table';
        
        // Cabeçalho
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        if (actions.length > 0) {
            const actionHeader = document.createElement('th');
            actionHeader.textContent = 'Ações';
            headerRow.appendChild(actionHeader);
        }
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Corpo
        const tbody = document.createElement('tbody');
        data.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });
            
            if (actions.length > 0) {
                const actionCell = document.createElement('td');
                actions.forEach(action => {
                    const actionBtn = action.cloneNode(true);
                    actionCell.appendChild(actionBtn);
                });
                tr.appendChild(actionCell);
            }
            
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        
        return table;
    }

    static createForm(fields, onSubmit = null) {
        const form = document.createElement('form');
        form.className = 'form';
        
        fields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            
            const label = document.createElement('label');
            label.textContent = field.label;
            label.setAttribute('for', field.name);
            
            let input;
            switch (field.type) {
                case 'textarea':
                    input = document.createElement('textarea');
                    break;
                case 'select':
                    input = document.createElement('select');
                    if (field.options) {
                        field.options.forEach(option => {
                            const optionElement = document.createElement('option');
                            optionElement.value = option.value;
                            optionElement.textContent = option.label;
                            input.appendChild(optionElement);
                        });
                    }
                    break;
                default:
                    input = document.createElement('input');
                    input.type = field.type;
            }
            
            input.id = field.name;
            input.name = field.name;
            input.required = field.required || false;
            
            if (field.placeholder) {
                input.placeholder = field.placeholder;
            }
            
            formGroup.appendChild(label);
            formGroup.appendChild(input);
            form.appendChild(formGroup);
        });
        
        if (onSubmit) {
            form.addEventListener('submit', onSubmit);
        }
        
        return form;
    }

    static createDropdown(items, onSelect = null) {
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        
        const button = document.createElement('button');
        button.className = 'dropdown-toggle';
        button.innerHTML = 'Selecionar <i class="fas fa-chevron-down"></i>';
        
        const menu = document.createElement('div');
        menu.className = 'dropdown-menu';
        
        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'dropdown-item';
            menuItem.textContent = item.label;
            menuItem.addEventListener('click', () => {
                if (onSelect) onSelect(item.value);
                dropdown.classList.remove('open');
            });
            menu.appendChild(menuItem);
        });
        
        button.addEventListener('click', () => {
            dropdown.classList.toggle('open');
        });
        
        dropdown.appendChild(button);
        dropdown.appendChild(menu);
        
        return dropdown;
    }

    static createProgressBar(percentage, label = '') {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        progressBar.innerHTML = `
            ${label ? `<div class="progress-label">${label}</div>` : ''}
            <div class="progress-track">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="progress-text">${percentage}%</div>
        `;
        
        return progressBar;
    }

    static createBadge(text, type = 'default') {
        const badge = document.createElement('span');
        badge.className = `badge badge-${type}`;
        badge.textContent = text;
        return badge;
    }

    static createAlert(message, type = 'info', dismissible = true) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-${this.getAlertIcon(type)}"></i>
                <span>${message}</span>
            </div>
            ${dismissible ? '<button class="alert-close"><i class="fas fa-times"></i></button>' : ''}
        `;
        
        if (dismissible) {
            const closeBtn = alert.querySelector('.alert-close');
            closeBtn.addEventListener('click', () => {
                alert.remove();
            });
        }
        
        return alert;
    }

    static getAlertIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    static createTabs(tabs, activeTab = 0) {
        const tabContainer = document.createElement('div');
        tabContainer.className = 'tabs';
        
        const tabList = document.createElement('div');
        tabList.className = 'tab-list';
        
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content';
        
        tabs.forEach((tab, index) => {
            const tabButton = document.createElement('button');
            tabButton.className = `tab-button ${index === activeTab ? 'active' : ''}`;
            tabButton.textContent = tab.label;
            tabButton.addEventListener('click', () => {
                this.switchTab(tabContainer, index);
            });
            tabList.appendChild(tabButton);
            
            const tabPanel = document.createElement('div');
            tabPanel.className = `tab-panel ${index === activeTab ? 'active' : ''}`;
            tabPanel.innerHTML = tab.content;
            tabContent.appendChild(tabPanel);
        });
        
        tabContainer.appendChild(tabList);
        tabContainer.appendChild(tabContent);
        
        return tabContainer;
    }

    static switchTab(container, index) {
        const buttons = container.querySelectorAll('.tab-button');
        const panels = container.querySelectorAll('.tab-panel');
        
        buttons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        
        panels.forEach((panel, i) => {
            panel.classList.toggle('active', i === index);
        });
    }

    static createAccordion(items) {
        const accordion = document.createElement('div');
        accordion.className = 'accordion';
        
        items.forEach((item, index) => {
            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordion-item';
            
            const header = document.createElement('div');
            header.className = 'accordion-header';
            header.innerHTML = `
                <span>${item.title}</span>
                <i class="fas fa-chevron-down"></i>
            `;
            
            const content = document.createElement('div');
            content.className = 'accordion-content';
            content.innerHTML = item.content;
            
            header.addEventListener('click', () => {
                this.toggleAccordion(accordionItem);
            });
            
            accordionItem.appendChild(header);
            accordionItem.appendChild(content);
            accordion.appendChild(accordionItem);
        });
        
        return accordion;
    }

    static toggleAccordion(item) {
        const isOpen = item.classList.contains('open');
        
        // Fechar todos os outros itens
        const allItems = item.parentElement.querySelectorAll('.accordion-item');
        allItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('open');
            }
        });
        
        // Toggle do item atual
        item.classList.toggle('open', !isOpen);
    }

    static createSearchBox(placeholder = 'Buscar...', onSearch = null) {
        const searchBox = document.createElement('div');
        searchBox.className = 'search-box';
        
        searchBox.innerHTML = `
            <i class="fas fa-search"></i>
            <input type="text" placeholder="${placeholder}">
        `;
        
        const input = searchBox.querySelector('input');
        if (onSearch) {
            input.addEventListener('input', (e) => {
                onSearch(e.target.value);
            });
        }
        
        return searchBox;
    }

    static createPagination(totalPages, currentPage = 1, onPageChange = null) {
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        
        // Botão anterior
        if (currentPage > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'pagination-btn';
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.addEventListener('click', () => {
                if (onPageChange) onPageChange(currentPage - 1);
            });
            pagination.appendChild(prevBtn);
        }
        
        // Páginas
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                if (onPageChange) onPageChange(i);
            });
            pagination.appendChild(pageBtn);
        }
        
        // Botão próximo
        if (currentPage < totalPages) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'pagination-btn';
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.addEventListener('click', () => {
                if (onPageChange) onPageChange(currentPage + 1);
            });
            pagination.appendChild(nextBtn);
        }
        
        return pagination;
    }

    static createTooltip(element, text) {
        element.classList.add('tooltip');
        element.setAttribute('data-tooltip', text);
        return element;
    }

    static createLoadingSpinner(size = 'medium') {
        const spinner = document.createElement('div');
        spinner.className = `loading-spinner spinner-${size}`;
        return spinner;
    }

    static createEmptyState(title, description, action = null) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        
        emptyState.innerHTML = `
            <div class="empty-state-icon">
                <i class="fas fa-inbox"></i>
            </div>
            <h3>${title}</h3>
            <p>${description}</p>
            ${action ? `<div class="empty-state-action">${action.outerHTML}</div>` : ''}
        `;
        
        return emptyState;
    }

    static createConfirmDialog(title, message, onConfirm, onCancel) {
        const dialog = this.createModal(title, `
            <div class="confirm-dialog">
                <p>${message}</p>
                <div class="confirm-actions">
                    <button class="btn-secondary" id="confirm-cancel">Cancelar</button>
                    <button class="btn-primary" id="confirm-ok">Confirmar</button>
                </div>
            </div>
        `);
        
        const cancelBtn = dialog.querySelector('#confirm-cancel');
        const confirmBtn = dialog.querySelector('#confirm-ok');
        
        cancelBtn.addEventListener('click', () => {
            dialog.remove();
            if (onCancel) onCancel();
        });
        
        confirmBtn.addEventListener('click', () => {
            dialog.remove();
            if (onConfirm) onConfirm();
        });
        
        return dialog;
    }

    static createFileUpload(onUpload, accept = '*') {
        const upload = document.createElement('div');
        upload.className = 'file-upload';
        
        upload.innerHTML = `
            <input type="file" accept="${accept}" style="display: none;">
            <div class="upload-area">
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Clique para selecionar um arquivo ou arraste aqui</p>
            </div>
        `;
        
        const input = upload.querySelector('input');
        const area = upload.querySelector('.upload-area');
        
        input.addEventListener('change', (e) => {
            if (onUpload) onUpload(e.target.files[0]);
        });
        
        area.addEventListener('click', () => {
            input.click();
        });
        
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.classList.add('dragover');
        });
        
        area.addEventListener('dragleave', () => {
            area.classList.remove('dragover');
        });
        
        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                if (onUpload) onUpload(e.dataTransfer.files[0]);
            }
        });
        
        return upload;
    }
}

// ===== UTILITÁRIOS =====
class Utils {
    static formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    }

    static formatDateTime(date) {
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validateCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');
        
        if (cpf.length !== 11) return false;
        
        // Verificar se todos os dígitos são iguais
        if (/^(\d)\1{10}$/.test(cpf)) return false;
        
        // Validar primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let remainder = 11 - (sum % 11);
        let digit1 = remainder < 2 ? 0 : remainder;
        
        // Validar segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        remainder = 11 - (sum % 11);
        let digit2 = remainder < 2 ? 0 : remainder;
        
        return parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2;
    }

    static maskCPF(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    static maskPhone(phone) {
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    static getRandomColor() {
        const colors = [
            '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
            '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#16a085'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    static copyToClipboard(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return Promise.resolve();
        }
    }

    static downloadFile(data, filename, type = 'text/plain') {
        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    static getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    static setQueryParam(name, value) {
        const url = new URL(window.location);
        url.searchParams.set(name, value);
        window.history.pushState({}, '', url);
    }

    static removeQueryParam(name) {
        const url = new URL(window.location);
        url.searchParams.delete(name);
        window.history.pushState({}, '', url);
    }
}

// ===== EXPORTAÇÃO =====
window.Components = Components;
window.Utils = Utils; 