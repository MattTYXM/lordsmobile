import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RallyDistributionRequest } from './rally-distribution-request';
import { RallyDistributionService } from './rally-distribution.service';
import { RallyDistributionResponse } from './rally-distribution-response';
import { formatNumber } from '@angular/common';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-rally-distribution',
  templateUrl: './rally-distribution.component.html',
  styleUrls: ['./rally-distribution.component.scss']
})
export class RallyDistributionComponent implements OnInit {

  public rallyDistribution: RallyDistributionResponse = new RallyDistributionResponse();
  private readonly defaultRallyDistributionRequest = new RallyDistributionRequest(0, 0, 0, 0, 0);
  private form: FormGroup;

  constructor(private rallyDistributionService: RallyDistributionService, private localStorageService: LocalStorageService) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    const rallyDistributionRequest = this.localStorageService.get('rallyDistributionRequest') || this.defaultRallyDistributionRequest;

    this.form.addControl(
      'total',
      new FormControl(rallyDistributionRequest.total)
    );

    this.form.addControl(
      'infantry',
      new FormControl(rallyDistributionRequest.infantry)
    );

    this.form.addControl(
      'ranged',
      new FormControl(rallyDistributionRequest.ranged)
    );

    this.form.addControl(
      'cavalry',
      new FormControl(rallyDistributionRequest.cavalry)
    );

    this.form.addControl(
      'siege',
      new FormControl(rallyDistributionRequest.siege)
    );

    this.calculate();
  }

  get total(): FormControl {
    return this._getField('total');
  }

  get infantry(): FormControl {
    return this._getField('infantry');
  }

  get ranged(): FormControl {
    return this._getField('ranged');
  }

  get cavalry(): FormControl {
    return this._getField('cavalry');
  }

  get siege(): FormControl {
    return this._getField('siege');
  }

  calculate(): void {
    try {
      const rallyDistributionRequest = new RallyDistributionRequest(
        this.total.value,
        this.infantry.value,
        this.ranged.value,
        this.cavalry.value,
        this.siege.value
      );

      this.rallyDistribution = this.rallyDistributionService.getRallyDistribution(
        rallyDistributionRequest
      );
      this.localStorageService.set('rallyDistributionRequest', rallyDistributionRequest);
    } catch (e) {
      this.localStorageService.remove('rallyDistributionRequest');
      this.rallyDistribution = new RallyDistributionResponse();
    }
  }

  public formatNumber(value: number): string {
    return formatNumber(value, 'en_US');
  }

  private _getField(fieldName: string): FormControl {
    return this.form.get(fieldName) as FormControl;
  }
}
